import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Server-side Supabase client for Server Components, Server Actions, and
 * Route Handlers. Reads the session from the request's cookies via
 * `next/headers` — call this fresh on every request, never cache the
 * instance across requests.
 *
 * Next.js 14: `cookies()` is synchronous. If this project is upgraded to
 * Next.js 15+, add `await` in front of `cookies()` below (its App Router
 * API became async there).
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render, where cookies can't be
          // written — safe to ignore because middleware refreshes the
          // session on every request (see src/middleware.ts).
        }
      },
    },
  });
}
