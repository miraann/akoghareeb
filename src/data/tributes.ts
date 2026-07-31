import type { LocalizedText } from "./gallery";

export interface TributeItem {
  id: string;
  title: LocalizedText;
  personName: string;
  details: LocalizedText;
  imageUrl: string | null;
}
