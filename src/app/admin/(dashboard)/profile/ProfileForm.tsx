"use client";

import { useState } from "react";
import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { SiteProfileRow } from "@/lib/supabase/database.types";

export function ProfileForm({
  action,
  profile,
}: {
  action: (formData: FormData) => Promise<void>;
  profile: SiteProfileRow | null;
}) {
  const [preview, setPreview] = useState<string | null>(profile?.hero_image_url ?? null);

  return (
    <form action={action} className="flex flex-col gap-8">
      <LocalizedField
        name="eyebrow"
        label="Eyebrow (small tagline above the name)"
        defaults={{ ku: profile?.eyebrow_ku ?? "", en: profile?.eyebrow_en ?? "", ar: profile?.eyebrow_ar ?? "" }}
      />

      <LocalizedField
        name="name"
        label="Name"
        defaults={{ ku: profile?.name_ku ?? "", en: profile?.name_en ?? "", ar: profile?.name_ar ?? "" }}
      />

      <LocalizedField
        name="statement"
        label="Bio / statement"
        multiline
        defaults={{
          ku: profile?.statement_ku ?? "",
          en: profile?.statement_en ?? "",
          ar: profile?.statement_ar ?? "",
        }}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
          Homepage portrait image
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
            name="hero_image_file"
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
            name="hero_image_url"
            placeholder="https://…"
            onChange={(e) => {
              if (e.target.value) setPreview(e.target.value);
            }}
            className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none focus:border-pigment-terracotta"
          />
        </label>
        <p className="text-fluid-xs text-ink-faint">
          A new file always takes priority over a pasted URL. Leave both empty to keep the current image.
          Leave any text field empty to fall back to the site&apos;s default copy for that language.
        </p>
      </fieldset>

      <div>
        <SubmitButton>Save changes</SubmitButton>
      </div>
    </form>
  );
}
