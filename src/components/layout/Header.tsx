"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { scrollToId } from "@/lib/scrollTo";

const SECTION_IDS = ["gallery", "biography", "media", "tributes", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  function handleNavClick(id: string) {
    setMenuOpen(false);
    scrollToId(id);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-canvas/80 shadow-ring backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-art section-px flex h-20 items-center justify-between">
          <button onClick={() => scrollToId("hero")} aria-label={t("brand")} className="shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt={t("brand")}
              width={200}
              height={200}
              priority
              className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            />
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="text-fluid-sm font-medium text-ink-soft transition-colors hover:text-pigment-terracotta"
              >
                {t(id === "media" ? "media" : id)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-b border-ink/10 bg-canvas/95 backdrop-blur-lg lg:hidden"
          >
            <nav className="section-px flex flex-col gap-1 py-4">
              {SECTION_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="rounded-lg px-2 py-3 text-start text-fluid-base font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
                >
                  {t(id)}
                </button>
              ))}
              <div className="px-2 pt-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
