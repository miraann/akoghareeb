"use client";

import { useLocale, useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import type { ExhibitionEntry } from "@/data/exhibitions";
import type { Locale } from "@/i18n/routing";

export function BiographyClient({ exhibitions }: { exhibitions: ExhibitionEntry[] }) {
  const t = useTranslations("biography");
  const locale = useLocale() as Locale;
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="biography" className="relative py-24 sm:py-32">
      <div className="container-art section-px flex flex-col gap-20">
        <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("intro")} />

        <div className="flex flex-col gap-16">
          {paragraphs.map((p, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-8 lg:gap-14 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <Reveal from={i % 2 === 1 ? "end" : "start"} className="w-full lg:w-2/5">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white p-2 shadow-card ring-1 ring-ink/5">
                  <div className="h-full w-full overflow-hidden rounded-xl">
                    <ArtworkPlaceholder seed={`bio-${i}`} className="h-full w-full" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="w-full lg:w-3/5">
                <p className="text-fluid-base leading-relaxed text-ink-soft">{p}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal from="fade">
          <blockquote className="relative mx-auto max-w-3xl text-center">
            <Quote className="mx-auto mb-4 h-8 w-8 text-pigment-gold" />
            <p className="font-display text-fluid-2xl font-medium italic leading-snug text-ink">
              “{t("quote")}”
            </p>
          </blockquote>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="mb-10 font-display text-fluid-xl font-semibold text-ink">
              {t("timelineHeading")}
            </h3>
          </Reveal>
          {exhibitions.length === 0 ? (
            <p className="text-fluid-base text-ink-faint">{t("timelineEmpty")}</p>
          ) : (
            <div className="relative ms-3 border-s-2 border-ink/10 ps-10">
              {exhibitions.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i * 0.05, 0.3)} className="relative pb-12 last:pb-0">
                  <span
                    className="absolute top-1 h-3.5 w-3.5 rounded-full bg-pigment-terracotta ring-4 ring-canvas"
                    style={{ insetInlineStart: "-2.6rem" }}
                  />
                  <span className="text-fluid-xs font-semibold uppercase tracking-[0.2em] text-pigment-terracotta">
                    {e.year}
                  </span>
                  <h4 className="mt-1 font-display text-fluid-lg font-semibold text-ink">
                    {e.title[locale]}
                  </h4>
                  <p className="mt-2 max-w-xl text-fluid-sm leading-relaxed text-ink-soft">
                    {e.description[locale]}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
