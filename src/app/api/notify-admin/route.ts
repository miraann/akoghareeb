import "server-only";
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { createAdminClient } from "@/lib/supabase/admin";

// Called by the Supabase DB trigger in
// supabase/migrations/0014_notify_new_message_trigger.sql whenever a new
// row lands in public.contact_messages. Sends a push notification to every
// device registered in public.admin_push_tokens via Firebase Cloud
// Messaging, using firebase-admin (which handles the OAuth2/service-account
// exchange internally) instead of hand-rolled JWT signing.
//
// Required server-only env vars (see .env.local.example):
//   WEBHOOK_SECRET, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

interface ContactMessageRecord {
  id: string;
  name: string;
  phone: string;
  type: string;
  message: string;
}

function getFirebaseAdminApp() {
  if (getApps().length) return getApp();

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/** Constant-time check of the shared secret; fails closed when it isn't configured. */
function hasValidSecret(request: Request): boolean {
  const expected = process.env.WEBHOOK_SECRET;
  const given = request.headers.get("x-webhook-secret");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { record?: ContactMessageRecord } | null;
  const record = body?.record;
  if (!record) {
    return NextResponse.json({ ok: false, error: "missing_record" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: tokens, error } = await supabase.from("admin_push_tokens").select("id, token");
  if (error) {
    console.error("[notify-admin] failed to load push tokens", error.message);
    return NextResponse.json({ ok: false, error: "load_tokens_failed" }, { status: 500 });
  }
  if (!tokens || tokens.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  const messaging = getMessaging(getFirebaseAdminApp());
  const snippet = record.message.length > 100 ? `${record.message.slice(0, 100)}…` : record.message;

  const staleTokenIds: string[] = [];

  await Promise.all(
    tokens.map(async ({ id, token }) => {
      try {
        await messaging.send({
          token,
          // A real "notification" block (not data-only) is what lets
          // Android's OS show a status-bar notification even when the app
          // process is backgrounded or killed — Capacitor's push plugin is
          // built specifically to bridge this correctly, unlike the raw
          // browser service worker this replaced.
          notification: {
            title: `پەیامی نوێ لە ${record.name}`,
            body: snippet,
          },
          data: { url: "/admin/messages" },
          android: { priority: "high" },
        });
      } catch (err) {
        const code = (err as { code?: string }).code;
        if (code === "messaging/registration-token-not-registered") {
          staleTokenIds.push(id);
        } else {
          console.error("[notify-admin] FCM send failed", err);
        }
      }
    })
  );

  if (staleTokenIds.length > 0) {
    await supabase.from("admin_push_tokens").delete().in("id", staleTokenIds);
  }

  return NextResponse.json({ ok: true, sent: tokens.length - staleTokenIds.length });
}
