"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveUploadedImageUrl } from "@/lib/supabase/uploadImage";

function parsePaintingFields(formData: FormData) {
  const category_id = String(formData.get("category_id") ?? "").trim();
  if (!category_id) {
    throw new Error("تکایە پۆلێک هەڵبژێرە.");
  }

  const year = Number(formData.get("year"));
  if (!Number.isInteger(year) || year < 1000 || year > 3000) {
    throw new Error("تکایە ساڵێکی دروست بنووسە.");
  }

  const title_ku = String(formData.get("title_ku") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  if (!title_ku || !title_en || !title_ar) {
    throw new Error("ناونیشان بە هەر سێ زمانەکە پێویستە.");
  }

  return {
    title_ku,
    title_en,
    title_ar,
    description_ku: String(formData.get("description_ku") ?? "").trim(),
    description_en: String(formData.get("description_en") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    medium_ku: String(formData.get("medium_ku") ?? "").trim(),
    medium_en: String(formData.get("medium_en") ?? "").trim(),
    medium_ar: String(formData.get("medium_ar") ?? "").trim(),
    category_id,
    year,
  };
}

function revalidatePublicSite() {
  revalidatePath("/admin/paintings");
  revalidatePath("/[locale]", "layout");
}

export async function createPainting(formData: FormData) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const fields = parsePaintingFields(formData);
  const imageUrl = await resolveUploadedImageUrl(supabase, formData, "image_file", "image_url");

  // New entries append after the current last item in drag-and-drop order,
  // rather than landing at the default 0 and jumping to the top.
  const { data: last } = await supabase
    .from("paintings")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort_order = (last?.sort_order ?? -1) + 1;

  const { error } = await supabase
    .from("paintings")
    .insert({ ...fields, image_url: imageUrl ?? null, sort_order });
  if (error) throw new Error(error.message);

  revalidatePublicSite();
  redirect("/admin/paintings");
}

export async function updatePainting(id: string, formData: FormData) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const fields = parsePaintingFields(formData);
  const imageUrl = await resolveUploadedImageUrl(supabase, formData, "image_file", "image_url");

  const { error } = await supabase
    .from("paintings")
    .update({
      ...fields,
      ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicSite();
  redirect("/admin/paintings");
}

export async function deletePainting(id: string) {
  await requireAdminSession();
  const supabase = createAdminClient();
  const { error } = await supabase.from("paintings").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicSite();
}

export async function reorderPaintings(orderedIds: string[]) {
  await requireAdminSession();
  const supabase = createAdminClient();

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("paintings").update({ sort_order: index }).eq("id", id)
    )
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);

  revalidatePublicSite();
}
