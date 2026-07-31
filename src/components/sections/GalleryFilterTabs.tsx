"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { GalleryCategory } from "@/data/gallery";
import type { Locale } from "@/i18n/routing";

/** Sentinel for "no category filter applied" — every real category is
 * identified by its own (database) id, so this just needs to be a value no
 * real category id will ever collide with. */
export const ALL_FILTER = "all";

/** "all" or a GalleryCategory.id */
export type FilterValue = string;

export function GalleryFilterTabs({
  categories,
  active,
  onChange,
}: {
  categories: GalleryCategory[];
  active: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const t = useTranslations("gallery.filters");
  const locale = useLocale() as Locale;

  const tabs: { value: FilterValue; label: string }[] = [
    { value: ALL_FILTER, label: t("all") },
    ...categories.map((c) => ({ value: c.id, label: c.label[locale] })),
  ];

  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`relative rounded-full px-5 py-2.5 text-fluid-sm font-medium transition-colors ${
              isActive ? "" : "border border-ink/15 hover:border-ink/30"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeButtonIndicator"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-canvas" : "text-ink-soft hover:text-ink"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
