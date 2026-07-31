import { getPaintings } from "@/lib/data/paintings";
import { getPaintingCategories } from "@/lib/data/paintingCategories";
import { GalleryClient } from "./GalleryClient";

export async function Gallery() {
  const [items, categories] = await Promise.all([getPaintings(), getPaintingCategories()]);
  return <GalleryClient items={items} categories={categories} />;
}
