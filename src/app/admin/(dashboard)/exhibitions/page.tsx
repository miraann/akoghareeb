import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ExhibitionsList } from "./ExhibitionsList";

export default async function AdminExhibitionsPage() {
  const supabase = createClient();
  const { data: exhibitions, error } = await supabase
    .from("exhibitions")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">پێشانگاکان</h1>
          <p className="mt-1 text-fluid-sm text-ink-soft">هێڵی کاتی پیشاندراو لە بەشی ژیاننامەدا.</p>
        </div>
        <Link
          href="/admin/exhibitions/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
        >
          <Plus size={16} /> زیادکردنی پێشانگا
        </Link>
      </div>

      {error && (
        <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
          سەرکەوتوو نەبوو لە بارکردنی پێشانگاکان: {error.message}
        </p>
      )}

      {!error && (!exhibitions || exhibitions.length === 0) && (
        <p className="text-fluid-sm text-ink-faint">هێشتا هیچ پێشانگایەک نییە — یەکەمیان زیاد بکە.</p>
      )}

      {!error && exhibitions && exhibitions.length > 0 && (
        <>
          <p className="text-fluid-xs text-ink-faint">دەستەی گرتنی چەپەوە بۆ گۆڕینی ڕیزبەندی ڕاکێشە.</p>
          <ExhibitionsList exhibitions={exhibitions} />
        </>
      )}
    </div>
  );
}
