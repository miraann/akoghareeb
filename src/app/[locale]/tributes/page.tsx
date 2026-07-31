import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Quote } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollExperience } from "@/components/background/ScrollExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { getTributes } from "@/lib/data/tributes";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tributes" });

  return {
    title: t("heading"),
    description: t("subheading"),
  };
}

export default async function TributesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tributes");
  const items = await getTributes();
  const loc = locale as Locale;

  return (
    <>
      <Header />
      <ScrollExperience showBrush={false}>
        <main>
          <section className="relative pb-24 pt-36 sm:pb-32 sm:pt-40">
            <div className="container-art section-px flex flex-col gap-12">
              <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />

              {items.length === 0 ? (
                <p className="text-fluid-base text-ink-faint">{t("empty")}</p>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)}>
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                        <div className="relative aspect-[4/3] w-full shrink-0 bg-canvas-paper">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <Quote size={18} className="text-pigment-terracotta" />
                          <h3 className="font-display text-fluid-lg font-semibold leading-snug text-ink">
                            {item.title[loc]}
                          </h3>
                          <p className="flex-1 text-fluid-sm leading-relaxed text-ink-soft">
                            {item.details[loc]}
                          </p>
                          <span className="border-t border-ink/10 pt-3 text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-faint">
                            {item.personName}
                          </span>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </ScrollExperience>
    </>
  );
}
