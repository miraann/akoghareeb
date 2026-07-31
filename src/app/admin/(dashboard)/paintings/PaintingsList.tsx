"use client";

import { useState } from "react";
import Link from "next/link";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Pencil } from "lucide-react";
import { DeleteButton } from "../../_components/DeleteButton";
import { deletePainting, reorderPaintings } from "./actions";
import type { PaintingRow, PaintingCategoryRow } from "@/lib/supabase/database.types";

type PaintingWithCategory = PaintingRow & { category: PaintingCategoryRow | null };

function PaintingRowItem({
  painting,
  onDragEnd,
}: {
  painting: PaintingWithCategory;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={painting}
      dragListener={false}
      dragControls={controls}
      onDragEnd={onDragEnd}
      className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        aria-label="ڕیزبەندی بگۆڕە"
        className="flex h-9 w-9 shrink-0 touch-none items-center justify-center rounded-full text-ink-faint transition-colors hover:text-ink active:cursor-grabbing"
      >
        <GripVertical size={16} />
      </button>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas-paper">
        {painting.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={painting.image_url} alt="" className="h-full w-full object-contain" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-fluid-sm font-medium text-ink">{painting.title_ku}</div>
        <div className="text-fluid-xs text-ink-faint">
          {painting.category?.label_ku ?? "—"} · {painting.year}
        </div>
      </div>
      <Link
        href={`/admin/paintings/${painting.id}`}
        aria-label="دەستکاریکردن"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
      >
        <Pencil size={15} />
      </Link>
      <DeleteButton
        action={deletePainting.bind(null, painting.id)}
        confirmMessage={`سڕینەوەی "${painting.title_ku}"؟ ناتوانرێت هەڵبوەشێندرێتەوە.`}
      />
    </Reorder.Item>
  );
}

export function PaintingsList({ paintings }: { paintings: PaintingWithCategory[] }) {
  const [items, setItems] = useState(paintings);

  function persistOrder(next: PaintingWithCategory[]) {
    reorderPaintings(next.map((p) => p.id)).catch(() => {
      // Best-effort — a failed save just means the next page load reverts
      // to the last order Supabase actually has stored.
    });
  }

  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={items}
      onReorder={setItems}
      className="flex flex-col gap-3"
    >
      {items.map((painting) => (
        <PaintingRowItem
          key={painting.id}
          painting={painting}
          onDragEnd={() => persistOrder(items)}
        />
      ))}
    </Reorder.Group>
  );
}
