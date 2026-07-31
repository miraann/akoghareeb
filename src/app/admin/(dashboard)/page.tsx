import Link from "next/link";
import { Image as ImageIcon, CalendarClock, Newspaper, UserRound, BookOpen, Tags, Inbox, Award } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUnreadMessageCount } from "./messages/actions";

async function getCounts() {
  const supabase = createClient();
  const [
    paintings,
    categories,
    exhibitions,
    press,
    pressCategories,
    profile,
    biographyBlocks,
    tributes,
    unreadMessages,
  ] = await Promise.all([
    supabase.from("paintings").select("*", { count: "exact", head: true }),
    supabase.from("painting_categories").select("*", { count: "exact", head: true }),
    supabase.from("exhibitions").select("*", { count: "exact", head: true }),
    supabase.from("press_media").select("*", { count: "exact", head: true }),
    supabase.from("press_categories").select("*", { count: "exact", head: true }),
    supabase.from("site_profile").select("id").eq("id", 1).maybeSingle(),
    supabase.from("biography_blocks").select("*", { count: "exact", head: true }),
    supabase.from("tributes").select("*", { count: "exact", head: true }),
    getUnreadMessageCount(),
  ]);

  return {
    paintings: paintings.count ?? 0,
    categories: categories.count ?? 0,
    exhibitions: exhibitions.count ?? 0,
    press: press.count ?? 0,
    pressCategories: pressCategories.count ?? 0,
    profileConfigured: Boolean(profile.data),
    biographyBlocks: biographyBlocks.count ?? 0,
    tributes: tributes.count ?? 0,
    unreadMessages,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    {
      href: "/admin/profile",
      label: "پرۆفایلی پەڕەی سەرەکی",
      value: counts.profileConfigured ? "ڕێکخراوە" : "بەکارهێنانی بنەڕەتییەکان",
      icon: UserRound,
    },
    { href: "/admin/biography", label: "بەشەکانی ژیاننامە", value: counts.biographyBlocks, icon: BookOpen },
    { href: "/admin/paintings", label: "تابلۆکان", value: counts.paintings, icon: ImageIcon },
    { href: "/admin/paintings-categories", label: "پۆلەکانی تابلۆ", value: counts.categories, icon: Tags },
    { href: "/admin/exhibitions", label: "پێشانگاکان", value: counts.exhibitions, icon: CalendarClock },
    { href: "/admin/press", label: "کار و چالاکییەکان", value: counts.press, icon: Newspaper },
    { href: "/admin/press-categories", label: "پۆلەکانی میدیا", value: counts.pressCategories, icon: Tags },
    { href: "/admin/tributes", label: "پێزانینەکان", value: counts.tributes, icon: Award },
    { href: "/admin/messages", label: "پەیامی نەخوێندراوە", value: counts.unreadMessages, icon: Inbox },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">گشتی</h1>
        <p className="font-kurdish mt-1 text-fluid-sm text-ink-soft">
          بەڕێوەبردنی ناوەڕۆکی پیشاندراو لە ماڵپەڕی گشتیدا.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map(({ href, label, value, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pigment-terracotta/30 hover:shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-paper text-pigment-terracotta transition-colors group-hover:bg-pigment-terracotta group-hover:text-canvas">
              <Icon size={18} />
            </span>
            <div>
              <div
                className={`font-kurdish ${typeof value === "number" ? "text-fluid-2xl font-semibold text-ink" : "text-fluid-lg font-semibold text-ink"}`}
              >
                {value}
              </div>
              <div className="font-kurdish text-fluid-sm text-ink-soft">{label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
