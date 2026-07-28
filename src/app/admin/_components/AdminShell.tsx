import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, CalendarClock, Newspaper, LogOut, ExternalLink } from "lucide-react";
import { signOut } from "../actions";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/paintings", label: "Paintings", icon: ImageIcon },
  { href: "/admin/exhibitions", label: "Exhibitions", icon: CalendarClock },
  { href: "/admin/press", label: "Press", icon: Newspaper },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div dir="ltr" className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-display text-fluid-base font-semibold text-ink">
                Ako Gharib — Admin
              </span>
              <span className="text-fluid-xs text-ink-faint">{email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-fluid-xs font-medium text-ink-soft hover:text-pigment-terracotta"
              >
                View site <ExternalLink size={13} />
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-fluid-xs font-medium text-ink-soft transition-colors hover:border-pigment-crimson hover:text-pigment-crimson"
                >
                  <LogOut size={13} /> Sign out
                </button>
              </form>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-fluid-xs font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
              >
                <Icon size={14} /> {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</main>
    </div>
  );
}
