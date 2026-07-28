"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { PressCategory } from "@/data/press";

export type MediaFilterValue = PressCategory | "all";

const FILTERS: MediaFilterValue[] = ["all", "interview", "article", "publication"];

export function MediaFilterTabs({
  active,
  onChange,
}: {
  active: MediaFilterValue;
  onChange: (v: MediaFilterValue) => void;
}) {
  const t = useTranslations("media.filters");

  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(f)}
            className={`relative rounded-full px-5 py-2.5 text-fluid-sm font-medium transition-colors ${
              isActive ? "" : "border border-ink/15 hover:border-ink/30"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="media-filter-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-canvas" : "text-ink-soft hover:text-ink"}`}>
              {t(f)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
