import { getPressItems } from "@/lib/data/press";
import { MediaPressClient } from "./MediaPressClient";

export async function MediaPress() {
  const items = await getPressItems();
  return <MediaPressClient items={items} />;
}
