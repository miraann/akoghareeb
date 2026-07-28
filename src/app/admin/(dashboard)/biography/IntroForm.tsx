"use client";

import { LocalizedField } from "../../_components/LocalizedField";
import { SubmitButton } from "../../_components/SubmitButton";
import type { BiographyIntroRow } from "@/lib/supabase/database.types";

export function IntroForm({
  action,
  intro,
}: {
  action: (formData: FormData) => Promise<void>;
  intro: BiographyIntroRow | null;
}) {
  return (
    <form action={action} className="flex flex-col gap-8">
      <LocalizedField
        name="eyebrow"
        label="Eyebrow (small label above the heading)"
        defaults={{ ku: intro?.eyebrow_ku ?? "", en: intro?.eyebrow_en ?? "", ar: intro?.eyebrow_ar ?? "" }}
      />

      <LocalizedField
        name="heading"
        label="Heading"
        defaults={{ ku: intro?.heading_ku ?? "", en: intro?.heading_en ?? "", ar: intro?.heading_ar ?? "" }}
      />

      <LocalizedField
        name="intro"
        label="Intro paragraph"
        multiline
        defaults={{ ku: intro?.intro_ku ?? "", en: intro?.intro_en ?? "", ar: intro?.intro_ar ?? "" }}
      />

      <p className="text-fluid-xs text-ink-faint">
        Leave any field empty to fall back to the site&apos;s default copy for that language.
      </p>

      <div>
        <SubmitButton>Save changes</SubmitButton>
      </div>
    </form>
  );
}
