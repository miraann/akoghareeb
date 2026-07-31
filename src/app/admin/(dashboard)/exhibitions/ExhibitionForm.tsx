"use client";

import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { ExhibitionRow } from "@/lib/supabase/database.types";

export function ExhibitionForm({
  action,
  exhibition,
}: {
  action: (formData: FormData) => Promise<void>;
  exhibition?: ExhibitionRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-8">
      <label className="flex max-w-xs flex-col gap-1.5">
        <span className="text-fluid-xs font-medium text-ink-soft">ساڵ</span>
        <input
          type="text"
          name="year"
          required
          placeholder="بۆ نموونە: ٢٠١٦ یان ٢٠١٩–٢٠٢٠"
          defaultValue={exhibition?.year ?? ""}
          className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
        />
      </label>

      <LocalizedField
        name="title"
        label="ناونیشان"
        required
        defaults={{ ku: exhibition?.title_ku, en: exhibition?.title_en, ar: exhibition?.title_ar }}
      />

      <LocalizedField
        name="details"
        label="وردەکارییەکان"
        multiline
        resizable
        defaults={{
          ku: exhibition?.details_ku,
          en: exhibition?.details_en,
          ar: exhibition?.details_ar,
        }}
      />

      <div>
        <SubmitButton>{exhibition ? "پاشەکەوتکردنی گۆڕانکارییەکان" : "زیادکردنی پێشانگا"}</SubmitButton>
      </div>
    </form>
  );
}
