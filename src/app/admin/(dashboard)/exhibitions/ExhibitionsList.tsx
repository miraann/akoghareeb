"use client";

import { useState } from "react";
import Link from "next/link";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Pencil } from "lucide-react";
import { DeleteButton } from "../../_components/DeleteButton";
import { deleteExhibition, reorderExhibitions } from "./actions";
import type { ExhibitionRow } from "@/lib/supabase/database.types";

function ExhibitionRow({
  exhibition,
  onDragEnd,
}: {
  exhibition: ExhibitionRow;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={exhibition}
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
      <div className="w-16 shrink-0 text-fluid-sm font-semibold text-pigment-terracotta">
        {exhibition.year}
      </div>
      <div className="min-w-0 flex-1 truncate text-fluid-sm font-medium text-ink">
        {exhibition.title_ku}
      </div>
      <Link
        href={`/admin/exhibitions/${exhibition.id}`}
        aria-label="دەستکاریکردن"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
      >
        <Pencil size={15} />
      </Link>
      <DeleteButton
        action={deleteExhibition.bind(null, exhibition.id)}
        confirmMessage={`سڕینەوەی "${exhibition.title_ku}"؟ ناتوانرێت هەڵبوەشێندرێتەوە.`}
      />
    </Reorder.Item>
  );
}

export function ExhibitionsList({ exhibitions }: { exhibitions: ExhibitionRow[] }) {
  const [items, setItems] = useState(exhibitions);

  function persistOrder(next: ExhibitionRow[]) {
    reorderExhibitions(next.map((e) => e.id)).catch(() => {
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
      {items.map((exhibition) => (
        <ExhibitionRow
          key={exhibition.id}
          exhibition={exhibition}
          onDragEnd={() => persistOrder(items)}
        />
      ))}
    </Reorder.Group>
  );
}
