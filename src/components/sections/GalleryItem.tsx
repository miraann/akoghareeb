"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { hashString, mulberry32 } from "@/lib/seededRandom";
import type { GalleryItem as GalleryItemType } from "@/data/gallery";
import type { Locale } from "@/i18n/routing";
import styles from "./ArtFrame.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER_STEP = 0.05;
const STAGGER_CAP = 8;

/** No stored image has no natural ratio to key off of, so we invent a
 * stable one from the item id — biased toward believable canvas
 * proportions (portrait 3:4 through landscape 4:3) — so placeholders sit
 * naturally in the masonry instead of collapsing to zero height. */
function placeholderRatio(seed: string) {
  const rand = mulberry32(hashString(seed));
  return 0.72 + rand() * 0.85;
}

export function GalleryItem({
  item,
  index,
  onOpen,
}: {
  item: GalleryItemType;
  index: number;
  onOpen: () => void;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("gallery");

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25, ease: EASE } }}
      transition={{
        layout: { duration: 0.5, ease: EASE },
        duration: 0.55,
        ease: EASE,
        delay: Math.min(index, STAGGER_CAP) * STAGGER_STEP,
      }}
      onClick={onOpen}
      aria-label={`${t("viewWork")}: ${item.title[locale]}`}
      className={`group relative block w-full break-inside-avoid text-start focus-visible:outline-none ${styles.frame}`}
    >
      <span aria-hidden className={`${styles.corner} ${styles.cornerTl}`} />
      <span aria-hidden className={`${styles.corner} ${styles.cornerTr}`} />
      <span aria-hidden className={`${styles.corner} ${styles.cornerBl}`} />
      <span aria-hidden className={`${styles.corner} ${styles.cornerBr}`} />

      <div className={styles.mat}>
        <div className={styles.canvas}>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title[locale]}
              width={0}
              height={0}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          ) : (
            <div style={{ aspectRatio: placeholderRatio(item.id) }} className="w-full">
              <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-fluid-xs uppercase tracking-[0.2em] text-canvas/80">{item.year}</span>
            <span className="font-display text-fluid-lg font-medium text-canvas">
              {item.title[locale]}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
