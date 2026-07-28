import { getPaintings } from "@/lib/data/paintings";
import { GalleryClient } from "./GalleryClient";

export async function Gallery() {
  const items = await getPaintings();
  return <GalleryClient items={items} />;
}
