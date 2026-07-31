import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { TributeItem } from "@/data/tributes";
import type { TributeRow } from "@/lib/supabase/database.types";

function toTributeItem(row: TributeRow): TributeItem {
  return {
    id: row.id,
    title: { ku: row.title_ku, en: row.title_en, ar: row.title_ar },
    personName: row.person_name,
    details: { ku: row.details_ku, en: row.details_en, ar: row.details_ar },
    imageUrl: row.image_url,
  };
}

export async function getTributes(): Promise<TributeItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tributes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[data] failed to load tributes", error.message);
    return [];
  }

  return (data ?? []).map(toTributeItem);
}
