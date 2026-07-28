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
        <span className="text-fluid-xs font-medium text-ink-soft">Year</span>
        <input
          type="text"
          name="year"
          required
          placeholder="e.g. 2016 or 2019–2020"
          defaultValue={exhibition?.year ?? ""}
          className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
        />
      </label>

      <LocalizedField
        name="title"
        label="Title"
        required
        defaults={{ ku: exhibition?.title_ku, en: exhibition?.title_en, ar: exhibition?.title_ar }}
      />

      <LocalizedField
        name="details"
        label="Details"
        multiline
        defaults={{
          ku: exhibition?.details_ku,
          en: exhibition?.details_en,
          ar: exhibition?.details_ar,
        }}
      />

      <div>
        <SubmitButton>{exhibition ? "Save changes" : "Add exhibition"}</SubmitButton>
      </div>
    </form>
  );
}
