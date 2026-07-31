"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useDirection } from "@/lib/useDirection";

const COMPACT_VIEWPORT_QUERY = "(max-width: 1023px)";

interface PaintCanvasProps {
  progress: MotionValue<number>;
  /** The floating palette+brush glyph tracks scroll position across the
   * whole page — on standalone pages that don't share the homepage's
   * scroll narrative (e.g. the media detail pages), it reads as a stray,
   * out-of-place element rather than part of a story. Default on. */
  showBrush?: boolean;
}

/**
 * A fixed, full-viewport paint layer that reacts to global scroll progress.
 * Each stroke "draws itself in" as the visitor scrolls through the matching
 * section, then recedes as the next one takes over — a quiet narrative
 * thread connecting Hero -> Gallery -> Biography -> Media -> Contact.
 */
export function PaintCanvas({ progress, showBrush = true }: PaintCanvasProps) {
  const reduceMotion = useReducedMotion();
  const dir = useDirection();

  // The brush glyph's path (below) was authored drifting mostly toward the
  // right side of the screen — fine on desktop, but it reads as crowding
  // the right edge on narrower mobile/tablet/iPad viewports. Mirroring the
  // waypoints only there flips the whole path left<->right while leaving
  // desktop untouched.
  const [isCompactViewport, setIsCompactViewport] = useState(
    () => typeof window !== "undefined" && window.matchMedia(COMPACT_VIEWPORT_QUERY).matches
  );
  useEffect(() => {
    const query = window.matchMedia(COMPACT_VIEWPORT_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setIsCompactViewport(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const heroPath = useTransform(progress, [0, 0.06, 0.16, 0.22], [0, 1, 1, 0]);
  const heroOpacity = useTransform(progress, [0, 0.04, 0.18, 0.24], [0, 0.55, 0.55, 0]);

  const galleryPath = useTransform(progress, [0.18, 0.26, 0.38, 0.44], [0, 1, 1, 0]);
  const galleryOpacity = useTransform(progress, [0.18, 0.24, 0.4, 0.46], [0, 0.5, 0.5, 0]);

  const bioPath = useTransform(progress, [0.4, 0.48, 0.6, 0.66], [0, 1, 1, 0]);
  const bioOpacity = useTransform(progress, [0.4, 0.46, 0.62, 0.68], [0, 0.5, 0.5, 0]);

  const mediaPath = useTransform(progress, [0.62, 0.7, 0.8, 0.86], [0, 1, 1, 0]);
  const mediaOpacity = useTransform(progress, [0.62, 0.68, 0.82, 0.88], [0, 0.5, 0.5, 0]);

  const contactPath = useTransform(progress, [0.82, 0.9, 1], [0, 1, 1]);
  const contactOpacity = useTransform(progress, [0.82, 0.88, 1], [0, 0.5, 0.5]);

  const splatterScale = useTransform(progress, [0.15, 0.2, 0.35, 0.42], [0, 1, 1, 0.7]);
  const splatterScale2 = useTransform(progress, [0.6, 0.65, 0.78, 0.84], [0, 1, 1, 0.7]);

  const brushX = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isCompactViewport
      ? ["90%", "16%", "86%", "20%", "82%", "50%"]
      : ["10%", "84%", "14%", "80%", "18%", "50%"]
  );
  const brushY = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["14%", "28%", "48%", "62%", "78%", "90%"]
  );
  const brushRotate = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-10, 16, -12, 18, -14, 8]
  );

  if (reduceMotion) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-canvas">
        <div className="absolute inset-0 bg-canvas-grain opacity-60" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas will-change-transform"
      style={{
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="absolute inset-0 bg-canvas-grain" />

      <div
        className="absolute inset-0"
        style={{ transform: dir === "rtl" ? "scaleX(-1) translateZ(0)" : "translateZ(0)" }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <motion.path
            d="M -50 170 C 220 60, 420 270, 1050 110"
            stroke="#C1652F"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: heroPath, opacity: heroOpacity }}
          />
          <motion.path
            d="M 1050 380 C 780 300, 480 480, -50 350"
            stroke="#1F5F5B"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: galleryPath, opacity: galleryOpacity }}
          />
          <motion.path
            d="M -50 560 C 260 650, 660 450, 1050 590"
            stroke="#C9A227"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: bioPath, opacity: bioOpacity }}
          />
          <motion.path
            d="M 1050 760 C 740 850, 340 660, -50 790"
            stroke="#9B3B3B"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: mediaPath, opacity: mediaOpacity }}
          />
          <motion.path
            d="M -50 940 C 310 870, 700 990, 1050 900"
            stroke="#1C1B19"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: contactPath, opacity: contactOpacity }}
          />
        </svg>

        {/* paint splash, top-left */}
        <motion.div
          style={{ scale: splatterScale }}
          className="absolute left-[10%] top-[20%] h-24 w-24 origin-center sm:h-32 sm:w-32"
        >
          <Image
            src="/images/backgroundanimationicon/3.png"
            alt=""
            fill
            sizes="128px"
            className="object-contain opacity-25"
          />
        </motion.div>

        {/* paint splash, bottom-right (mirrored for variety) */}
        <motion.div
          style={{ scale: splatterScale2, scaleX: -1 }}
          className="absolute right-[8%] top-[64%] h-24 w-24 origin-center sm:h-32 sm:w-32"
        >
          <Image
            src="/images/backgroundanimationicon/3.png"
            alt=""
            fill
            sizes="128px"
            className="object-contain opacity-25"
          />
        </motion.div>

        {showBrush && (
          <motion.div
            style={{ left: brushX, top: brushY, rotate: brushRotate, x: "-50%", y: "-50%", z: 0 }}
            className="absolute h-10 w-10 will-change-transform sm:h-20 sm:w-20"
          >
            <motion.div
              className="relative h-full w-full opacity-80"
              animate={{ scale: [1, 1.05, 0.98, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/backgroundanimationicon/1.png"
                alt=""
                fill
                sizes="80px"
                className="object-contain drop-shadow-sm"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
