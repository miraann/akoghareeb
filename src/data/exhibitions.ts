import type { LocalizedText } from "./gallery";

export interface ExhibitionEntry {
  id: string;
  year: string;
  title: LocalizedText;
  description: LocalizedText;
}
