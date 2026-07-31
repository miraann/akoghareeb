"use client";

import { useState } from "react";
import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { PaintingRow, PaintingCategoryRow } from "@/lib/supabase/database.types";

export function PaintingForm({
  action,
  painting,
  categories,
}: {
  action: (formData: FormData) => Promise<void>;
  painting?: PaintingRow;
  categories: PaintingCategoryRow[];
}) {
  const [preview, setPreview] = useState<string | null>(painting?.image_url ?? null);

  return (
    <form action={action} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          وێنەی کارەکە
        </legend>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- local blob: previews aren't eligible for next/image optimization
          <img
            src={preview}
            alt=""
            className="h-48 w-48 rounded-xl border border-ink/10 bg-canvas-paper object-contain"
          />
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs text-ink-faint">بارکردنی فایلێک</span>
          <input
            type="file"
            name="image_file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="rounded-xl border border-dashed border-ink/20 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-fluid-xs file:font-medium file:text-canvas"
          />
        </label>

        <p className="text-fluid-xs text-ink-faint">بەتاڵی بهێڵەرەوە بۆ پاراستنی وێنەی ئێستا.</p>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">پۆل</span>
          <select
            name="category_id"
            required
            defaultValue={painting?.category_id ?? categories[0]?.id ?? ""}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label_ku}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">ساڵ</span>
          <input
            type="number"
            name="year"
            required
            min={1000}
            max={3000}
            defaultValue={painting?.year ?? new Date().getFullYear()}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
          />
        </label>
      </div>

      <LocalizedField name="title" label="ناونیشان" required defaults={{
        ku: painting?.title_ku,
        en: painting?.title_en,
        ar: painting?.title_ar,
      }} />

      <LocalizedField
        name="medium"
        label="مادەی خام - پێوانەی تابلۆ (بۆ نموونە: پێوانە ٣٥-٤٥ سم ڕەنگی ڕۆن لەسەر کانڤاس)"
        defaults={{ ku: painting?.medium_ku, en: painting?.medium_en, ar: painting?.medium_ar }}
      />

      <LocalizedField
        name="description"
        label="وەسف"
        multiline
        defaults={{
          ku: painting?.description_ku,
          en: painting?.description_en,
          ar: painting?.description_ar,
        }}
      />

      <div>
        <SubmitButton>{painting ? "پاشەکەوتکردنی گۆڕانکارییەکان" : "زیادکردنی تابلۆ"}</SubmitButton>
      </div>
    </form>
  );
}
