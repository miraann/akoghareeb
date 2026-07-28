import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSupabaseSession } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin lives outside the [locale] segment entirely — it's an internal
  // tool, not a localized storefront route — so it bypasses next-intl and
  // gets its own Supabase-backed auth guard instead.
  if (pathname.startsWith("/admin")) {
    const { response, user } = await updateSupabaseSession(request);
    const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));

    if (!user && !isPublicAdminPath) {
      const redirectUrl = new URL("/admin/login", request.url);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (user && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
