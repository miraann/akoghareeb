"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ALL_FILTER, GalleryFilterTabs, type FilterValue } from "./GalleryFilterTabs";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import type { GalleryCategory, GalleryItem as GalleryItemType } from "@/data/gallery";

/**
 * Safety multiplier applied to the filtered set *before* it gets duplicated
 * for the loop. A bare `[...items, ...items]` (exactly 2 copies) only stays
 * gap-free as long as one copy is wider than the viewport — a thinly
 * populated filter on a wide monitor can run out of content right before
 * the wrap, which is the blank-void bug this project hit twice already.
 * Padding the *inside* of each duplicated half with a few extra repeats
 * keeps the exact "two copies + translateX(-50%)" mechanics intact while
 * making each half comfortably wider than any real monitor. It's a fixed
 * constant, not runtime-measured — a changing copy count while the
 * animation is live is what caused the earlier glitching, and CSS
 * percentage transforms don't need remeasurement anyway (see globals.css).
 */
const INNER_SAFETY_REPEAT = 3;

function MarqueeTrack({
  items,
  onOpen,
}: {
  items: GalleryItemType[];
  onOpen: (id: string) => void;
}) {
  const cluster = useMemo(
    () => Array.from({ length: INNER_SAFETY_REPEAT }).flatMap(() => items),
    [items]
  );
  const loop = useMemo(() => [...cluster, ...cluster], [cluster]);

  // Requested pacing formula, scaled by the same safety multiplier used
  // above so the perceived px/second speed doesn't change just because the
  // loop is padded with extra copies.
  const duration = Math.max(25, items.length * 4.5) * INNER_SAFETY_REPEAT;

  return (
    // Forced ltr: the marquee's own left-scrolling motion should always
    // read the same direction regardless of the page locale — a
    // Kurdish/Arabic `dir="rtl"` ancestor would flip flex-direction and
    // make the loop feel reversed/stuttery. Each card restores its own
    // correct direction for its title text below.
    <div dir="ltr" className="w-full overflow-hidden">
      <div
        className="flex w-max flex-row gap-6"
        style={{ animation: `scroll-left ${duration}s linear infinite` }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {loop.map((item, i) => {
          const copyIndex = Math.floor(i / items.length);
          return (
            <GalleryItem
              key={`${item.id}-${copyIndex}`}
              item={item}
              onOpen={() => onOpen(item.id)}
              ariaHidden={copyIndex > 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export function GalleryClient({
  items,
  categories,
}: {
  items: GalleryItemType[];
  categories: GalleryCategory[];
}) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<FilterValue>(ALL_FILTER);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === ALL_FILTER ? items : items.filter((i) => i.category.id === filter)),
    [items, filter]
  );

  const activeIndex = activeId ? filtered.findIndex((i) => i.id === activeId) : -1;
  const activeItem = activeIndex >= 0 ? filtered[activeIndex] : null;

  function next() {
    if (activeIndex < 0) return;
    setActiveId(filtered[(activeIndex + 1) % filtered.length].id);
  }

  function prev() {
    if (activeIndex < 0) return;
    setActiveId(filtered[(activeIndex - 1 + filtered.length) % filtered.length].id);
  }

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="container-art section-px flex flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />
          <Reveal delay={0.1} from="end">
            <GalleryFilterTabs categories={categories} active={filter} onChange={setFilter} />
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        {filtered.length === 0 ? (
          <p className="container-art section-px text-fluid-base text-ink-faint">{t("empty")}</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MarqueeTrack items={filtered} onOpen={setActiveId} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <Lightbox item={activeItem} onClose={() => setActiveId(null)} onPrev={prev} onNext={next} />
    </section>
  );
}
