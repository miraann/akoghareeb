"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const rawNext = String(formData.get("next") ?? "/admin");
  const next = rawNext.startsWith("/admin") ? rawNext : "/admin";

  if (!email || !password) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}
