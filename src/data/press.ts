import type { LocalizedText } from "./gallery";

export type PressCategory = "interview" | "article" | "publication";

export interface PressItem {
  id: string;
  category: PressCategory;
  outlet: string;
  date: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  href: string;
}
