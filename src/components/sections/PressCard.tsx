"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, FileText, Mic, BookOpen } from "lucide-react";
import type { PressItem } from "@/data/press";
import type { Locale } from "@/i18n/routing";
import { formatPressDate } from "@/lib/formatDate";

const ICONS = { interview: Mic, article: FileText, publication: BookOpen } as const;

export function PressCard({ item }: { item: PressItem }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("media");
  const Icon = ICONS[item.category];

  return (
    <motion.a
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      href={item.href}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-fluid-xs font-medium uppercase tracking-[0.15em] text-pigment-teal">
          <Icon size={14} /> {item.outlet}
        </span>
        <ExternalLink
          size={14}
          className="icon-flip shrink-0 text-ink-faint transition-colors group-hover:text-pigment-terracotta"
        />
      </div>
      <h3 className="font-display text-fluid-lg font-semibold leading-snug text-ink">
        {item.title[locale]}
      </h3>
      <p className="flex-1 text-fluid-sm leading-relaxed text-ink-soft">{item.excerpt[locale]}</p>
      <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-fluid-xs text-ink-faint">
        <span>{formatPressDate(item.date, locale)}</span>
        <span className="font-medium text-pigment-terracotta">{t("readMore")}</span>
      </div>
    </motion.a>
  );
}
