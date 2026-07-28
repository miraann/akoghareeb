"use client";

import { motion, MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { BrushGlyph } from "./BrushGlyph";
import { useDirection } from "@/lib/useDirection";

interface PaintCanvasProps {
  progress: MotionValue<number>;
}

/**
 * A fixed, full-viewport paint layer that reacts to global scroll progress.
 * Each stroke "draws itself in" as the visitor scrolls through the matching
 * section, then recedes as the next one takes over — a quiet narrative
 * thread connecting Hero -> Gallery -> Biography -> Media -> Contact.
 */
export function PaintCanvas({ progress }: PaintCanvasProps) {
  const reduceMotion = useReducedMotion();
  const dir = useDirection();

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
    ["10%", "84%", "14%", "80%", "18%", "50%"]
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

  // The bristle tip tints to whichever pigment the brush is currently "painting".
  const brushTipColor = useTransform(
    progress,
    [0, 0.19, 0.2, 0.41, 0.42, 0.63, 0.64, 0.85, 0.86, 1],
    [
      "#C1652F",
      "#C1652F",
      "#1F5F5B",
      "#1F5F5B",
      "#C9A227",
      "#C9A227",
      "#9B3B3B",
      "#9B3B3B",
      "#1C1B19",
      "#1C1B19",
    ]
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

        {/* hand-painted dab, terracotta */}
        <motion.svg
          style={{ scale: splatterScale }}
          className="absolute left-[10%] top-[20%] h-24 w-24 origin-center sm:h-32 sm:w-32"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 30 C61 27 71 34 70 46 C69 58 60 68 48 67 C37 66 29 57 31 45 C32 37 41 32 50 30Z"
            fill="#C1652F"
            fillOpacity="0.16"
          />
          <path
            d="M74 24 C79 22 83 26 80 30 C78 34 72 33 71 29 C70 27 72 25 74 24Z"
            fill="#C1652F"
            fillOpacity="0.22"
          />
          <path d="M22 68 C25 67 28 69 27 72 C26 75 22 74 21 71 C21 70 21 69 22 68Z" fill="#C1652F" fillOpacity="0.2" />
          <path d="M26 20 C28 19 30 21 29 23 C28 25 25 24 25 22 C25 21 25 21 26 20Z" fill="#C1652F" fillOpacity="0.18" />
        </motion.svg>

        {/* hand-painted dab, teal */}
        <motion.svg
          style={{ scale: splatterScale2 }}
          className="absolute right-[8%] top-[64%] h-24 w-24 origin-center sm:h-32 sm:w-32"
          viewBox="0 0 100 100"
        >
          <path
            d="M48 32 C58 29 68 37 66 48 C64 58 54 66 44 63 C35 60 30 51 34 42 C36 37 42 34 48 32Z"
            fill="#1F5F5B"
            fillOpacity="0.16"
          />
          <path d="M20 30 C23 29 26 31 25 34 C24 37 20 36 19 33 C19 32 19 31 20 30Z" fill="#1F5F5B" fillOpacity="0.2" />
          <path d="M74 60 C77 59 79 61 78 64 C77 67 73 66 72 63 C72 62 73 61 74 60Z" fill="#1F5F5B" fillOpacity="0.18" />
        </motion.svg>

        <motion.div
          style={{ left: brushX, top: brushY, rotate: brushRotate, x: "-50%", y: "-50%", z: 0 }}
          className="absolute h-7 w-7 will-change-transform sm:h-14 sm:w-14"
        >
          <motion.div
            className="h-full w-full opacity-70"
            animate={{ scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BrushGlyph className="h-full w-full drop-shadow-sm" tipColor={brushTipColor} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
