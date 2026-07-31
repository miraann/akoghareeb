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

          <button
            onClick={onPrev}
            aria-label={t("prev")}
            className="absolute start-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 hover:text-pigment-terracotta sm:start-8"
          >
            <ChevronLeft size={20} className="icon-flip drop-shadow-sm" />
          </button>
          <button
            onClick={onNext}
            aria-label={t("next")}
            className="absolute end-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 hover:text-pigment-terracotta sm:end-8"
          >
            <ChevronRight size={20} className="icon-flip drop-shadow-sm" />
          </button>

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title[locale]}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-canvas shadow-soft"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-canvas-paper">
              {item.imageUrl ? (
                <>
                  {/* Blurred, scaled-up fill so the letterboxed edges around
                      non-4:3 paintings show a soft frosted-glass wash of the
                      artwork's own colors instead of flat beige. */}
                  <Image
                    src={item.imageUrl}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 768px) 42rem, 100vw"
                    className="scale-110 object-cover opacity-80 blur-2xl"
                  />
                  <div className="absolute inset-0 bg-canvas/20 backdrop-blur-2xl" />
                  <Image
                    src={item.imageUrl}
                    alt={item.title[locale]}
                    fill
                    sizes="(min-width: 768px) 42rem, 100vw"
                    className="relative object-contain"
                  />
                </>
              ) : (
                <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
              )}

              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 hover:text-pigment-terracotta"
              >
                <X size={18} className="drop-shadow-sm" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-8 sm:p-10">
              <span className="text-center text-fluid-xs uppercase tracking-[0.25em] text-pigment-terracotta">
                {item.category.label[locale]}
              </span>
              <h3 className="text-center font-display text-fluid-2xl font-semibold leading-tight text-ink">
                {item.title[locale]}
              </h3>
              <dl className="mt-2 grid grid-cols-2 gap-4 text-fluid-sm">
                <div>
                  <dt className="text-ink-faint">{t("year")}</dt>
                  <dd className="font-medium text-ink">{item.year}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">{t("medium")}</dt>
                  <dd className="font-medium text-ink">{item.medium[locale]}</dd>
                </div>
              </dl>
              <p className="border-t border-ink/10 pt-4 text-fluid-base leading-relaxed text-ink-soft">
                {item.description[locale]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
