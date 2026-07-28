import { getExhibitions } from "@/lib/data/exhibitions";
import { BiographyClient } from "./BiographyClient";

export async function Biography() {
  const exhibitions = await getExhibitions();
  return <BiographyClient exhibitions={exhibitions} />;
}
