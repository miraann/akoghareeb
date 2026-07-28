"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryFilterTabs, type FilterValue } from "./GalleryFilterTabs";
import { GalleryItem } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import type { GalleryItem as GalleryItemType } from "@/data/gallery";

export function GalleryClient({ items }: { items: GalleryItemType[] }) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
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
      <div className="container-art section-px flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />
          <Reveal delay={0.1} from="end">
            <GalleryFilterTabs active={filter} onChange={setFilter} />
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <p className="text-fluid-base text-ink-faint">{t("empty")}</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <GalleryItem key={item.id} item={item} onOpen={() => setActiveId(item.id)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Lightbox item={activeItem} onClose={() => setActiveId(null)} onPrev={prev} onNext={next} />
    </section>
  );
}
