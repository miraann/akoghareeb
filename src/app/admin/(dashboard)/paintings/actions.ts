"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveUploadedImageUrl } from "@/lib/supabase/uploadImage";
import type { PaintingCategory } from "@/lib/supabase/database.types";

const CATEGORIES: PaintingCategory[] = ["historical", "political", "portraits"];

function parsePaintingFields(formData: FormData) {
  const category = String(formData.get("category") ?? "");
  if (!CATEGORIES.includes(category as PaintingCategory)) {
    throw new Error("Please choose a valid category.");
  }

  const year = Number(formData.get("year"));
  if (!Number.isInteger(year) || year < 1000 || year > 3000) {
    throw new Error("Please enter a valid year.");
  }

  const title_ku = String(formData.get("title_ku") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  if (!title_ku || !title_en || !title_ar) {
    throw new Error("Title is required in all three languages.");
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
    category: category as PaintingCategory,
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

  const { error } = await supabase.from("paintings").insert({ ...fields, image_url: imageUrl ?? null });
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
    .update({ ...fields, ...(imageUrl !== undefined ? { image_url: imageUrl } : {}) })
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
