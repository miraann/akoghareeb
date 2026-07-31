export interface LocalizedText {
  ku: string;
  ar: string;
  en: string;
}

/** A painting category, now admin-managed data rather than a fixed set of
 * code-level values — see supabase/migrations/0005_painting_categories.sql. */
export interface GalleryCategory {
  id: string;
  slug: string;
  label: LocalizedText;
}

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  year: number;
  medium: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string | null;
}
