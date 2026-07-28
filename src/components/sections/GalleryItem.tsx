"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ArtworkPlaceholder } from "@/components/ui/ArtworkPlaceholder";
import type { GalleryItem as GalleryItemType } from "@/data/gallery";
import type { Locale } from "@/i18n/routing";

export function GalleryItem({
  item,
  onOpen,
}: {
  item: GalleryItemType;
  onOpen: () => void;
}) {
  const locale = useLocale() as Locale;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl bg-white text-start shadow-card ring-1 ring-ink/5"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title[locale]}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ArtworkPlaceholder seed={item.id} className="h-full w-full" />
          )}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-fluid-xs uppercase tracking-[0.2em] text-canvas/80">{item.year}</span>
          <span className="font-display text-fluid-lg font-medium text-canvas">
            {item.title[locale]}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
