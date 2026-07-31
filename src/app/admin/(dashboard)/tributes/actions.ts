"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveUploadedImageUrl } from "@/lib/supabase/uploadImage";

function parseTributeFields(formData: FormData) {
  const person_name = String(formData.get("person_name") ?? "").trim();
  const title_ku = String(formData.get("title_ku") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const details_ku = String(formData.get("details_ku") ?? "").trim();
  const details_en = String(formData.get("details_en") ?? "").trim();
  const details_ar = String(formData.get("details_ar") ?? "").trim();

  if (!person_name || !title_ku || !title_en || !title_ar || !details_ku || !details_en || !details_ar) {
    throw new Error("ناوی کەس، ناونیشان و وردەکاری (بە هەر سێ زمانەکە) پێویستن.");
  }

  return { person_name, title_ku, title_en, title_ar, details_ku, details_en, details_ar };
}

function revalidatePublicSite() {
  revalidatePath("/admin/tributes");
  revalidatePath("/[locale]/tributes", "page");
  revalidatePath("/[locale]", "layout");
}

export async function createTribute(formData: FormData) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const fields = parseTributeFields(formData);
  const imageUrl = await resolveUploadedImageUrl(supabase, formData, "image_file");

  const { error } = await supabase.from("tributes").insert({ ...fields, image_url: imageUrl ?? null });
  if (error) throw new Error(error.message);

  revalidatePublicSite();
  redirect("/admin/tributes");
}

export async function updateTribute(id: string, formData: FormData) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const fields = parseTributeFields(formData);
  const imageUrl = await resolveUploadedImageUrl(supabase, formData, "image_file");

  const { error } = await supabase
    .from("tributes")
    .update({
      ...fields,
      ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicSite();
  redirect("/admin/tributes");
}

export async function deleteTribute(id: string) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const { error } = await supabase.from("tributes").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicSite();
}
