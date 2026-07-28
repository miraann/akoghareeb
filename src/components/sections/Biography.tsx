import { getExhibitions } from "@/lib/data/exhibitions";
import { getBiographyIntro, getBiographyBlocks } from "@/lib/data/biography";
import { BiographyClient } from "./BiographyClient";

export async function Biography() {
  const [exhibitions, intro, blocks] = await Promise.all([
    getExhibitions(),
    getBiographyIntro(),
    getBiographyBlocks(),
  ]);

  return <BiographyClient exhibitions={exhibitions} intro={intro} blocks={blocks} />;
}
