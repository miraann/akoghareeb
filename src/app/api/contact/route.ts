import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  type: z.enum(["collector", "commission", "media", "other"]),
  message: z.string().min(10),
});

// TODO: wire this up to a real email provider (Resend, SMTP, Formspree, etc.)
// once credentials are available. For now it validates and logs the submission.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  console.log("[contact] new inquiry received", {
    type: parsed.data.type,
    email: parsed.data.email,
  });

  return NextResponse.json({ ok: true });
}
