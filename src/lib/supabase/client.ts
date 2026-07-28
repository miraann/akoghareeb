"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Browser-side Supabase client. Safe to import from client components — it
 * carries the session in cookies so the server client (see server.ts) can
 * read the same auth state during SSR.
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl(), supabaseAnonKey());
}
