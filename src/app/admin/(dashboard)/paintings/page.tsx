import Link from "next/link";
import { Plus, Tags } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PaintingsList } from "./PaintingsList";
import type { PaintingRow, PaintingCategoryRow } from "@/lib/supabase/database.types";

// database.types.ts is hand-written and has no Relationships metadata, so
// the joined select's shape below must be described locally (see the same
// pattern in src/lib/data/paintings.ts).
type PaintingWithCategory = PaintingRow & { category: PaintingCategoryRow | null };

export default async function AdminPaintingsPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*, category:painting_categories(*)")
    .order("sort_order", { ascending: true });
  const paintings = data as PaintingWithCategory[] | null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">تابلۆکان</h1>
          <p className="mt-1 text-fluid-sm text-ink-soft">کارە هونەرییەکانی پیشاندراو لە پێشانگای گشتیدا.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/paintings-categories"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 text-fluid-sm font-medium text-ink-soft transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
          >
            <Tags size={16} /> بەڕێوەبردنی پۆلەکان
          </Link>
          <Link
            href="/admin/paintings/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
          >
            <Plus size={16} /> زیادکردنی تابلۆ
          </Link>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
          سەرکەوتوو نەبوو لە بارکردنی تابلۆکان: {error.message}
        </p>
      )}

      {!error && (!paintings || paintings.length === 0) && (
        <p className="text-fluid-sm text-ink-faint">هێشتا هیچ تابلۆیەک نییە — یەکەمیان زیاد بکە.</p>
      )}

      {!error && paintings && paintings.length > 0 && (
        <>
          <p className="text-fluid-xs text-ink-faint">دەستەی گرتنی چەپەوە بۆ گۆڕینی ڕیزبەندی ڕاکێشە.</p>
          <PaintingsList paintings={paintings} />
        </>
      )}
    </div>
  );
}
