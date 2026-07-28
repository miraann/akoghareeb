"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { useDirection } from "@/lib/useDirection";
import type { GalleryItem } from "@/data/gallery";
import type { Locale } from "@/i18n/routing";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("gallery");
  const dir = useDirection();

  useEffect(() => {
    if (!item) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") (dir === "rtl" ? onNext : onPrev)();
      if (e.key === "ArrowRight") (dir === "rtl" ? onPrev : onNext)();
    }

    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose, onPrev, onNext, dir]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title[locale]}
            className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-2xl bg-canvas shadow-soft md:grid-cols-2"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label={t("close")}
              className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-ring transition-colors hover:text-pigment-terracotta"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-square md:aspect-auto">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title[locale]}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
              )}
            </div>

            <div className="flex flex-col gap-4 p-8 sm:p-10">
              <span className="text-fluid-xs uppercase tracking-[0.25em] text-pigment-terracotta">
                {t(`filters.${item.category}`)}
              </span>
              <h3 className="font-display text-fluid-2xl font-semibold leading-tight text-ink">
                {item.title[locale]}
              </h3>
              <p className="text-fluid-base leading-relaxed text-ink-soft">
                {item.description[locale]}
              </p>
              <dl className="mt-2 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 text-fluid-sm">
                <div>
                  <dt className="text-ink-faint">{t("year")}</dt>
                  <dd className="font-medium text-ink">{item.year}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">{t("medium")}</dt>
                  <dd className="font-medium text-ink">{item.medium[locale]}</dd>
                </div>
              </dl>
            </div>

            <button
              onClick={onPrev}
              aria-label={t("prev")}
              className="absolute start-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-ring transition-colors hover:text-pigment-terracotta"
            >
              <ChevronLeft size={18} className="icon-flip" />
            </button>
            <button
              onClick={onNext}
              aria-label={t("next")}
              className="absolute end-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-ring transition-colors hover:text-pigment-terracotta"
            >
              <ChevronRight size={18} className="icon-flip" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
