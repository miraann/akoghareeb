import type { Metadata } from "next";
import "../globals.css";

// /admin lives outside the [locale] segment, so it's a separate root route
// tree with its own <html>/<body> — it isn't part of the localized
// storefront and is intentionally always English/LTR regardless of the
// visitor's chosen site language.
export const metadata: Metadata = {
  title: "Admin — Ako Gharib",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-canvas font-body text-ink antialiased">{children}</body>
    </html>
  );
}
