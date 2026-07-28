"use client";

import { useState } from "react";
import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { PaintingRow } from "@/lib/supabase/database.types";

const CATEGORIES = [
  { value: "historical", label: "Historical & National" },
  { value: "political", label: "Political Caricature" },
  { value: "portraits", label: "Portraits" },
] as const;

export function PaintingForm({
  action,
  painting,
}: {
  action: (formData: FormData) => Promise<void>;
  painting?: PaintingRow;
}) {
  const [preview, setPreview] = useState<string | null>(painting?.image_url ?? null);

  return (
    <form action={action} className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Category</span>
          <select
            name="category"
            required
            defaultValue={painting?.category ?? "historical"}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs font-medium text-ink-soft">Year</span>
          <input
            type="number"
            name="year"
            required
            min={1000}
            max={3000}
            defaultValue={painting?.year ?? new Date().getFullYear()}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>
      </div>

      <LocalizedField name="title" label="Title" required defaults={{
        ku: painting?.title_ku,
        en: painting?.title_en,
        ar: painting?.title_ar,
      }} />

      <LocalizedField
        name="medium"
        label="Medium (e.g. Oil on canvas)"
        defaults={{ ku: painting?.medium_ku, en: painting?.medium_en, ar: painting?.medium_ar }}
      />

      <LocalizedField
        name="description"
        label="Description"
        multiline
        defaults={{
          ku: painting?.description_ku,
          en: painting?.description_en,
          ar: painting?.description_ar,
        }}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          Artwork image
        </legend>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- local blob: previews aren't eligible for next/image optimization
          <img
            src={preview}
            alt=""
            className="h-40 w-32 rounded-xl border border-ink/10 bg-canvas-paper object-cover"
          />
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs text-ink-faint">Upload a file</span>
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

        <label className="flex flex-col gap-1.5">
          <span className="text-fluid-xs text-ink-faint">…or paste an image URL</span>
          <input
            type="url"
            name="image_url"
            placeholder="https://…"
            onChange={(e) => {
              if (e.target.value) setPreview(e.target.value);
            }}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>
        <p className="text-fluid-xs text-ink-faint">
          A new file always takes priority over a pasted URL. Leave both empty to keep the current image.
        </p>
      </fieldset>

      <div>
        <SubmitButton>{painting ? "Save changes" : "Add painting"}</SubmitButton>
      </div>
    </form>
  );
}
