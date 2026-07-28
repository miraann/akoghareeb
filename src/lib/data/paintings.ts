import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/data/gallery";
import type { PaintingRow } from "@/lib/supabase/database.types";

function toGalleryItem(row: PaintingRow): GalleryItem {
  return {
    id: row.id,
    category: row.category,
    year: row.year,
    medium: { ku: row.medium_ku, en: row.medium_en, ar: row.medium_ar },
    title: { ku: row.title_ku, en: row.title_en, ar: row.title_ar },
    description: { ku: row.description_ku, en: row.description_en, ar: row.description_ar },
    imageUrl: row.image_url,
  };
}

export async function getPaintings(): Promise<GalleryItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("[data] failed to load paintings", error.message);
    return [];
  }

  return (data ?? []).map(toGalleryItem);
}
