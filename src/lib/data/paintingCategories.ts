import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { GalleryCategory } from "@/data/gallery";
import type { PaintingCategoryRow } from "@/lib/supabase/database.types";

function toGalleryCategory(row: PaintingCategoryRow): GalleryCategory {
  return {
    id: row.id,
    slug: row.slug,
    label: { ku: row.label_ku, en: row.label_en, ar: row.label_ar },
  };
}

export async function getPaintingCategories(): Promise<GalleryCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("painting_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data] failed to load painting categories", error.message);
    return [];
  }

  return (data ?? []).map(toGalleryCategory);
}
