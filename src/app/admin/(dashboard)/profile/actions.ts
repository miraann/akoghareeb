"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveUploadedImageUrl } from "@/lib/supabase/uploadImage";

export async function updateProfile(formData: FormData) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const heroImageUrl = await resolveUploadedImageUrl(supabase, formData, "hero_image_file", "hero_image_url");
  const contactCardImageUrl = await resolveUploadedImageUrl(
    supabase,
    formData,
    "contact_card_image_file",
    "contact_card_image_url"
  );

  const { error } = await supabase.from("site_profile").upsert({
    id: 1,
    eyebrow_ku: String(formData.get("eyebrow_ku") ?? "").trim(),
    eyebrow_en: String(formData.get("eyebrow_en") ?? "").trim(),
    eyebrow_ar: String(formData.get("eyebrow_ar") ?? "").trim(),
    name_ku: String(formData.get("name_ku") ?? "").trim(),
    name_en: String(formData.get("name_en") ?? "").trim(),
    name_ar: String(formData.get("name_ar") ?? "").trim(),
    statement_ku: String(formData.get("statement_ku") ?? "").trim(),
    statement_en: String(formData.get("statement_en") ?? "").trim(),
    statement_ar: String(formData.get("statement_ar") ?? "").trim(),
    ...(heroImageUrl !== undefined ? { hero_image_url: heroImageUrl } : {}),
    ...(contactCardImageUrl !== undefined ? { contact_card_image_url: contactCardImageUrl } : {}),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/profile");
  revalidatePath("/[locale]", "layout");
  redirect("/admin/profile?saved=1");
}
