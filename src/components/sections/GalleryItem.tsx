"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import { hashString, mulberry32 } from "@/lib/seededRandom";
import { useDirection } from "@/lib/useDirection";
import type { GalleryItem as GalleryItemType } from "@/data/gallery";
import type { Locale } from "@/i18n/routing";

const CARD_SIZES = "(min-width: 1024px) 450px, (min-width: 640px) 400px, 350px";

/** A missing image has no natural ratio to key off of, so we invent a
 * stable one from the item id — biased toward believable canvas
 * proportions (portrait 3:4 through landscape 4:3) — so placeholders sit
 * naturally in the carousel row instead of collapsing to zero width. */
function placeholderRatio(seed: string) {
  const rand = mulberry32(hashString(seed));
  return 0.72 + rand() * 0.85;
}

export function GalleryItem({
  item,
  onOpen,
  ariaHidden = false,
}: {
  item: GalleryItemType;
  onOpen: () => void;
  /** True for the duplicated second half of the marquee loop — visible and
   * clickable (it's genuinely on screen at times), but hidden from
   * keyboard/screen-reader navigation so assistive tech doesn't hit every
   * painting twice. */
  ariaHidden?: boolean;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("gallery");
  // The marquee track forces dir="ltr" on itself for correct scroll
  // mechanics — restore this card's real reading direction so Kurdish/
  // Arabic titles still align and read correctly.
  const dir = useDirection();

  return (
    <motion.button
      type="button"
      dir={dir}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onOpen}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : 0}
      aria-label={`${t("viewWork")}: ${item.title[locale]}`}
      // items-center is load-bearing here, not decorative: this button is a
      // flex-col container now, and flex's default align-items: stretch
      // would force the image wrapper to the container's full width,
      // fighting the organic per-painting width the marquee relies on.
      // items-center makes both children shrink-to-fit instead, which also
      // happens to center the caption under the artwork.
      className="group flex shrink-0 flex-col items-center gap-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pigment-gold"
    >
      <div className="h-[350px] overflow-hidden bg-canvas-paper shadow-card transition-shadow duration-300 group-hover:shadow-soft sm:h-[400px] lg:h-[450px]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title[locale]}
            width={0}
            height={0}
            sizes={CARD_SIZES}
            draggable={false}
            className="block h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div style={{ aspectRatio: placeholderRatio(item.id) }} className="h-full">
            <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
          </div>
        )}
      </div>

      <span className="font-display text-fluid-base font-medium text-black">{item.title[locale]}</span>
    </motion.button>
  );
}
