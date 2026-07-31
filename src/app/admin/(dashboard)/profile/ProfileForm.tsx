"use client";

import { useState } from "react";
import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { SiteProfileRow } from "@/lib/supabase/database.types";
import type { heroDefaults } from "@/lib/heroDefaults";

function withFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() ? value : fallback;
}

export function ProfileForm({
  action,
  profile,
  homepageDefaults,
}: {
  action: (formData: FormData) => Promise<void>;
  profile: SiteProfileRow | null;
  homepageDefaults: typeof heroDefaults;
}) {
  const [preview, setPreview] = useState<string | null>(profile?.hero_image_url ?? null);
  const [contactCardPreview, setContactCardPreview] = useState<string | null>(
    profile?.contact_card_image_url ?? null
  );

  return (
    <form action={action} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          وێنەی پۆرترێتی پەڕەی سەرەکی
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
            name="hero_image_file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="rounded-xl border border-dashed border-ink/20 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-fluid-xs file:font-medium file:text-canvas"
          />
        </label>

        <p className="text-fluid-xs text-ink-faint">
          بەتاڵی بهێڵەرەوە بۆ پاراستنی وێنەی ئێستا. هەر خانەیەکی دەقیش بەتاڵ بهێڵەرەوە بۆ گەڕانەوە بۆ دەقی
          بنەڕەتی ماڵپەڕ بۆ ئەو زمانە.
        </p>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          وێنەی کارتی پەیوەندی (بەشی «پەیوەندیمان پێوە بکە»)
        </legend>

        {contactCardPreview && (
          // eslint-disable-next-line @next/next/no-img-element -- local blob: previews aren't eligible for next/image optimization
          <img
            src={contactCardPreview}
            alt=""
            className="h-48 w-48 rounded-xl border border-ink/10 bg-canvas-paper object-cover"
          />
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs text-ink-faint">بارکردنی فایلێک</span>
          <input
            type="file"
            name="contact_card_image_file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setContactCardPreview(URL.createObjectURL(file));
            }}
            className="rounded-xl border border-dashed border-ink/20 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-fluid-xs file:font-medium file:text-canvas"
          />
        </label>

        <p className="text-fluid-xs text-ink-faint">
          کاتێک ئەم وێنەیە دابنرێت، لە جێی کارتی ستۆدیۆ و پەیوەندیی ڕەشی بەشی پەیوەندیدا بە هەمان قەبارە
          پیشان دەدرێت. بەتاڵی بهێڵەرەوە بۆ پیشاندانی کارتی ڕەشی بنەڕەتی.
        </p>
      </fieldset>

      <LocalizedField
        name="eyebrow"
        label="دەربڕینی بچووک (خشتەیەکی بچووک لەسەر ناو)"
        defaults={{
          ku: withFallback(profile?.eyebrow_ku, homepageDefaults.eyebrow.ku),
          en: withFallback(profile?.eyebrow_en, homepageDefaults.eyebrow.en),
          ar: withFallback(profile?.eyebrow_ar, homepageDefaults.eyebrow.ar),
        }}
      />

      <LocalizedField
        name="name"
        label="ناو"
        defaults={{
          ku: withFallback(profile?.name_ku, homepageDefaults.name.ku),
          en: withFallback(profile?.name_en, homepageDefaults.name.en),
          ar: withFallback(profile?.name_ar, homepageDefaults.name.ar),
        }}
      />

      <LocalizedField
        name="statement"
        label="ژیاننامە / دەربڕین"
        multiline
        defaults={{
          ku: withFallback(profile?.statement_ku, homepageDefaults.statement.ku),
          en: withFallback(profile?.statement_en, homepageDefaults.statement.en),
          ar: withFallback(profile?.statement_ar, homepageDefaults.statement.ar),
        }}
      />

      <div>
        <SubmitButton>پاشەکەوتکردنی گۆڕانکارییەکان</SubmitButton>
      </div>
    </form>
  );
}
