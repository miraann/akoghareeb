"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps the tributes row so a plain vertical mouse wheel scrolls it
 * horizontally when hovered — touch/trackpad swipes already scroll it
 * natively via overflow-x-auto, but a desktop mouse has no other way to
 * reach cards past the initially visible ones (the scrollbar is hidden).
 * Uses a native listener (not React's onWheel) because React's synthetic
 * wheel handler is passive by default and can't preventDefault().
 */
export function TributesCarousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div ref={ref} className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
      {children}
    </div>
  );
}
