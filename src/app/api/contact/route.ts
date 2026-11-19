import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Upper bounds keep a public form from being used to store or push huge
// payloads. The same limits are enforced in the database
// (supabase/migrations/0018_contact_message_limits.sql), because the table
// also accepts inserts straight from the public Supabase API.
const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(7).max(30).regex(/^[0-9+\-\s()]+$/),
  type: z.enum(["commission", "media", "other"]),
  message: z.string().trim().min(10).max(5000),
});

// TODO: also wire this up to a real email provider (Resend, SMTP, etc.) once
// credentials are available, so new inquiries page/notify someone in real
// time rather than only being visible next time the admin checks the inbox.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  if (error) {
    console.error("[contact] failed to save inquiry", error.message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
