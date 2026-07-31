import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../../_components/DeleteButton";
import { deleteTribute } from "./actions";

export default async function AdminTributesPage() {
  const supabase = createClient();
  const { data: tributes, error } = await supabase
    .from("tributes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">پێزانینەکان</h1>
          <p className="mt-1 text-fluid-sm text-ink-soft">
            خەڵات، بۆچوونی لایەنگران و باسکردنی میدیا کە لە پەڕەی گشتیدا پیشان دەدرێن.
          </p>
        </div>
        <Link
          href="/admin/tributes/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
        >
          <Plus size={16} /> زیادکردنی پێزانین
        </Link>
      </div>

      {error && (
        <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
          سەرکەوتوو نەبوو لە بارکردنی پێزانینەکان: {error.message}
        </p>
      )}

      {!error && (tributes?.length ?? 0) === 0 && (
        <p className="text-fluid-sm text-ink-faint">هێشتا هیچ پێزانینێک نییە — یەکەمیان زیاد بکە.</p>
      )}

      <div className="flex flex-col gap-3">
        {tributes?.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas-paper">
              {t.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.image_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-fluid-sm font-medium text-ink">{t.title_ku}</div>
              <div className="text-fluid-xs text-ink-faint">{t.person_name}</div>
            </div>
            <Link
              href={`/admin/tributes/${t.id}`}
              aria-label="دەستکاریکردن"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
            >
              <Pencil size={15} />
            </Link>
            <DeleteButton
              action={deleteTribute.bind(null, t.id)}
              confirmMessage={`سڕینەوەی "${t.title_ku}"؟ ناتوانرێت هەڵبوەشێندرێتەوە.`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
