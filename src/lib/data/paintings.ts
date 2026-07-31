import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/data/gallery";
import type { PaintingRow, PaintingCategoryRow } from "@/lib/supabase/database.types";

// database.types.ts is hand-written (not CLI-introspected), so it has no
// real Relationships metadata for Supabase's client to infer a joined
// select's shape from — this local type describes the actual shape of the
// "*, category:painting_categories(...)" query below.
type PaintingWithCategory = PaintingRow & {
  category: PaintingCategoryRow | null;
};

function toGalleryItem(row: PaintingWithCategory): GalleryItem | null {
  // A painting whose category was deleted out from under it (shouldn't
  // happen — categories are FK-protected from deletion while in use — but
  // defend against it anyway rather than crash the whole gallery).
  if (!row.category) return null;

  return {
    id: row.id,
    category: {
      id: row.category.id,
      slug: row.category.slug,
      label: { ku: row.category.label_ku, en: row.category.label_en, ar: row.category.label_ar },
    },
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
    .select("*, category:painting_categories(*)")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[data] failed to load paintings", error.message);
    return [];
  }

  return ((data as PaintingWithCategory[] | null) ?? [])
    .map(toGalleryItem)
    .filter((item): item is GalleryItem => item !== null);
}
