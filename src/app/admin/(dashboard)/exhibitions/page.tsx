import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../../_components/DeleteButton";
import { deleteExhibition } from "./actions";

export default async function AdminExhibitionsPage() {
  const supabase = createClient();
  const { data: exhibitions, error } = await supabase
    .from("exhibitions")
    .select("*")
    .order("year", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-fluid-xl font-semibold text-ink">Exhibitions</h1>
          <p className="mt-1 text-fluid-sm text-ink-soft">The timeline shown on the Biography section.</p>
        </div>
        <Link
          href="/admin/exhibitions/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
        >
          <Plus size={16} /> Add exhibition
        </Link>
      </div>

      {error && (
        <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
          Failed to load exhibitions: {error.message}
        </p>
      )}

      {!error && (exhibitions?.length ?? 0) === 0 && (
        <p className="text-fluid-sm text-ink-faint">No exhibitions yet — add the first one.</p>
      )}

      <div className="flex flex-col gap-3">
        {exhibitions?.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
          >
            <div className="w-16 shrink-0 text-fluid-sm font-semibold text-pigment-terracotta">{e.year}</div>
            <div className="min-w-0 flex-1 truncate text-fluid-sm font-medium text-ink">{e.title_en}</div>
            <Link
              href={`/admin/exhibitions/${e.id}`}
              aria-label="Edit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
            >
              <Pencil size={15} />
            </Link>
            <DeleteButton
              action={deleteExhibition.bind(null, e.id)}
              confirmMessage={`Delete "${e.title_en}"? This can't be undone.`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
