"use client";

import { useState } from "react";
import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { TributeRow } from "@/lib/supabase/database.types";

export function TributeForm({
  action,
  tribute,
}: {
  action: (formData: FormData) => Promise<void>;
  tribute?: TributeRow;
}) {
  const [preview, setPreview] = useState<string | null>(tribute?.image_url ?? null);

  return (
    <form action={action} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          وێنە (ئارەزوومەندانە)
        </legend>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- local blob: previews aren't eligible for next/image optimization
          <img
            src={preview}
            alt=""
            className="h-32 w-full max-w-sm rounded-xl border border-ink/10 bg-canvas-paper object-cover"
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

      <label className="flex flex-col gap-1.5">
        <span className="text-fluid-xs font-medium text-ink-soft">ناوی کەس یان لایەن</span>
        <input
          type="text"
          name="person_name"
          required
          placeholder="بۆ نموونە: وەزارەتی ڕۆشنبیری هەرێمی کوردستان"
          defaultValue={tribute?.person_name ?? ""}
          className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
        />
      </label>

      <LocalizedField
        name="title"
        label="ناونیشان"
        required
        defaults={{ ku: tribute?.title_ku, en: tribute?.title_en, ar: tribute?.title_ar }}
      />

      <LocalizedField
        name="details"
        label="وردەکاری (وتە، ڕەخنە، یان دیارییەکە)"
        multiline
        required
        resizable
        defaults={{ ku: tribute?.details_ku, en: tribute?.details_en, ar: tribute?.details_ar }}
      />

      <div>
        <SubmitButton>{tribute ? "پاشەکەوتکردنی گۆڕانکارییەکان" : "زیادکردنی پێزانین"}</SubmitButton>
      </div>
    </form>
  );
}
