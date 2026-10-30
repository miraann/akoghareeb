import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { Link } from "@/i18n/navigation";
import { TributesCarousel } from "./TributesCarousel";
import { getTributes } from "@/lib/data/tributes";
import type { Locale } from "@/i18n/routing";

// Homepage teaser only shows the most recent handful — the full set lives
// on the standalone /tributes page linked by the "see all" button below.
const HOMEPAGE_LIMIT = 6;

export async function Tributes() {
  const t = await getTranslations("tributes");
  const locale = (await getLocale()) as Locale;
  const items = (await getTributes()).slice(0, HOMEPAGE_LIMIT);

  if (items.length === 0) return null;

  return (
    <section id="tributes" className="relative py-24 sm:py-32">
      <div className="container-art section-px flex flex-col gap-12">
        <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />

        <Reveal delay={0.1}>
          <TributesCarousel>
            {items.map((item) => (
              <article
                key={item.id}
                className="relative flex w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:w-[380px] lg:w-[400px]"
              >
                <Quote
                  aria-hidden
                  className="pointer-events-none absolute -top-4 end-4 h-20 w-20 text-pigment-terracotta/10"
                />

                <div className="relative aspect-[16/10] w-full shrink-0 bg-canvas-paper">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt="" fill sizes="400px" className="object-cover" />
                  ) : (
                    <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
                  )}
                </div>

                <div className="relative flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-fluid-lg font-semibold leading-snug text-ink">
                    {item.title[locale]}
                  </h3>
                  <p className="flex-1 text-fluid-sm leading-relaxed text-ink-soft">{item.details[locale]}</p>
                  <span className="border-t border-ink/10 pt-3 text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
                    {item.personName}
                  </span>
                </div>
              </article>
            ))}
          </TributesCarousel>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <Link
            href="/tributes"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-fluid-sm font-medium text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-pigment-terracotta hover:text-pigment-terracotta"
          >
            {t("seeAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
