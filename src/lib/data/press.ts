import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { PressItem } from "@/data/press";
import type { PressMediaRow } from "@/lib/supabase/database.types";

function toPressItem(row: PressMediaRow): PressItem {
  return {
    id: row.id,
    category: row.type,
    outlet: row.source,
    date: row.date,
    title: { ku: row.title_ku, en: row.title_en, ar: row.title_ar },
    excerpt: { ku: row.excerpt_ku, en: row.excerpt_en, ar: row.excerpt_ar },
    href: row.url,
  };
}

export async function getPressItems(): Promise<PressItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("press_media")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("[data] failed to load press media", error.message);
    return [];
  }

  return (data ?? []).map(toPressItem);
}
