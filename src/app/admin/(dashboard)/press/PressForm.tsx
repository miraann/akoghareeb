"use client";

import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { PressMediaRow } from "@/lib/supabase/database.types";

const TYPES = [
  { value: "interview", label: "Interview" },
  { value: "article", label: "Article" },
  { value: "publication", label: "Publication" },
] as const;

export function PressForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: PressMediaRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Type</span>
          <select
            name="type"
            required
            defaultValue={item?.type ?? "interview"}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Date</span>
          <input
            type="date"
            name="date"
            required
            defaultValue={item?.date ?? ""}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Outlet / source</span>
          <input
            type="text"
            name="source"
            required
            placeholder="e.g. Kurdistan Arts Review"
            defaultValue={item?.source ?? ""}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Link</span>
          <input
            type="url"
            name="url"
            required
            placeholder="https://…"
            defaultValue={item?.url ?? ""}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>
      </div>

      <LocalizedField
        name="title"
        label="Title"
        required
        defaults={{ ku: item?.title_ku, en: item?.title_en, ar: item?.title_ar }}
      />

      <LocalizedField
        name="excerpt"
        label="Excerpt"
        multiline
        defaults={{ ku: item?.excerpt_ku, en: item?.excerpt_en, ar: item?.excerpt_ar }}
      />

      <div>
        <SubmitButton>{item ? "Save changes" : "Add press item"}</SubmitButton>
      </div>
    </form>
  );
}
