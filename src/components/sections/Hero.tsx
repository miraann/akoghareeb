"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { scrollToId } from "@/lib/scrollTo";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div className="container-art section-px grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div style={{ opacity: contentOpacity }} className="flex flex-col gap-6">
          <Reveal from="fade">
            <span className="text-fluid-xs font-medium uppercase tracking-[0.3em] text-pigment-terracotta">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-fluid-hero font-semibold leading-[0.95] tracking-tightest2 text-ink">
              {t("name")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-fluid-lg leading-relaxed text-ink-soft">
              {t("statement")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4 pt-2">
              <Button onClick={() => scrollToId("gallery")}>{t("cta")}</Button>
            </div>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: imageY }} className="relative">
          <Reveal from="end" delay={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[1.75rem] bg-white p-3 shadow-soft ring-1 ring-ink/5 sm:max-w-lg">
              <div className="h-full w-full overflow-hidden rounded-[1.25rem]">
                <ArtworkPlaceholder seed="hero-masterpiece" className="h-full w-full" />
              </div>
            </div>
          </Reveal>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId("gallery")}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-ink-faint transition-colors hover:text-pigment-terracotta"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label={t("scrollHint")}
      >
        <span className="text-fluid-xs uppercase tracking-[0.25em]">{t("scrollHint")}</span>
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
}
