import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { supabaseUrl } from "./env";

function secretKey(): string {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY. Set it in .env.local (server-only — no NEXT_PUBLIC_ prefix) and restart the server."
    );
  }
  return key;
}

/**
 * Full-privilege Supabase client (bypasses Row Level Security entirely).
 *
 * There's no per-user Supabase Auth session in this app — admin access is
 * gated by a single shared password (see src/lib/adminAuth.ts), not by a
 * Supabase user identity, so RLS's `is_admin()` / `auth.uid()` checks have
 * nothing to authenticate against for writes. This client is how the
 * already-password-gated Server Actions actually perform those writes.
 *
 * Never import this outside of src/app/admin/**\/actions.ts, and never let
 * SUPABASE_SECRET_KEY reach the browser.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(supabaseUrl(), secretKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
