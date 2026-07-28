import Link from "next/link";
import { Image as ImageIcon, CalendarClock, Newspaper, UserRound, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = createClient();
  const [paintings, exhibitions, press, profile, biographyBlocks] = await Promise.all([
    supabase.from("paintings").select("*", { count: "exact", head: true }),
    supabase.from("exhibitions").select("*", { count: "exact", head: true }),
    supabase.from("press_media").select("*", { count: "exact", head: true }),
    supabase.from("site_profile").select("id").eq("id", 1).maybeSingle(),
    supabase.from("biography_blocks").select("*", { count: "exact", head: true }),
  ]);

  return {
    paintings: paintings.count ?? 0,
    exhibitions: exhibitions.count ?? 0,
    press: press.count ?? 0,
    profileConfigured: Boolean(profile.data),
    biographyBlocks: biographyBlocks.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    {
      href: "/admin/profile",
      label: "Homepage profile",
      value: counts.profileConfigured ? "Configured" : "Using defaults",
      icon: UserRound,
    },
    { href: "/admin/biography", label: "Biography blocks", value: counts.biographyBlocks, icon: BookOpen },
    { href: "/admin/paintings", label: "Paintings", value: counts.paintings, icon: ImageIcon },
    { href: "/admin/exhibitions", label: "Exhibitions", value: counts.exhibitions, icon: CalendarClock },
    { href: "/admin/press", label: "Press & Media", value: counts.press, icon: Newspaper },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-fluid-xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-fluid-sm text-ink-soft">Manage the content shown on the public site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map(({ href, label, value, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-shadow hover:shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-paper text-pigment-terracotta">
              <Icon size={18} />
            </span>
            <div>
              <div
                className={typeof value === "number" ? "text-fluid-2xl font-semibold text-ink" : "text-fluid-lg font-semibold text-ink"}
              >
                {value}
              </div>
              <div className="text-fluid-sm text-ink-soft">{label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
