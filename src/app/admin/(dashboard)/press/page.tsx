import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../../_components/DeleteButton";
import { deletePressItem } from "./actions";

export default async function AdminPressPage() {
  const supabase = createClient();
  const { data: items, error } = await supabase
    .from("press_media")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-fluid-xl font-semibold text-ink">Press & Media</h1>
          <p className="mt-1 text-fluid-sm text-ink-soft">Interviews, articles, and publications.</p>
        </div>
        <Link
          href="/admin/press/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
        >
          <Plus size={16} /> Add press item
        </Link>
      </div>

      {error && (
        <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
          Failed to load press items: {error.message}
        </p>
      )}

      {!error && (items?.length ?? 0) === 0 && (
        <p className="text-fluid-sm text-ink-faint">No press items yet — add the first one.</p>
      )}

      <div className="flex flex-col gap-3">
        {items?.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
          >
            <div className="w-28 shrink-0 text-fluid-xs text-ink-faint">{p.date}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-fluid-sm font-medium text-ink">{p.title_en}</div>
              <div className="text-fluid-xs text-ink-faint">
                {p.source} · {p.type}
              </div>
            </div>
            <Link
              href={`/admin/press/${p.id}`}
              aria-label="Edit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
            >
              <Pencil size={15} />
            </Link>
            <DeleteButton
              action={deletePressItem.bind(null, p.id)}
              confirmMessage={`Delete "${p.title_en}"? This can't be undone.`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
