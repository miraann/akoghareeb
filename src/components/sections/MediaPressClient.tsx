"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFilterTabs, type MediaFilterValue } from "./MediaFilterTabs";
import { PressCard } from "./PressCard";
import type { PressItem } from "@/data/press";

export function MediaPressClient({ items }: { items: PressItem[] }) {
  const t = useTranslations("media");
  const [filter, setFilter] = useState<MediaFilterValue>("all");

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((p) => p.category === filter)),
    [items, filter]
  );

  return (
    <section id="media" className="relative py-24 sm:py-32">
      <div className="container-art section-px flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} subheading={t("subheading")} />
          <Reveal delay={0.1} from="end">
            <MediaFilterTabs active={filter} onChange={setFilter} />
          </Reveal>
        </div>

        {filtered.length === 0 ? (
          <p className="text-fluid-base text-ink-faint">{t("empty")}</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <PressCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
