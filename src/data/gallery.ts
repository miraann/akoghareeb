export type GalleryCategory = "historical" | "political" | "portraits";

export interface LocalizedText {
  ku: string;
  ar: string;
  en: string;
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
