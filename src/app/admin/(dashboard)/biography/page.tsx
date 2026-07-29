import Link from "next/link";
import { CheckCircle2, Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../../_components/DeleteButton";
import { IntroForm } from "./IntroForm";
import { deleteBiographyBlock, updateBiographyIntro } from "./actions";

export default async function AdminBiographyPage(
  props: {
    searchParams: Promise<{ saved?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const supabase = createClient();
  const [{ data: intro }, { data: blocks, error: blocksError }] = await Promise.all([
    supabase.from("biography_intro").select("*").eq("id", 1).maybeSingle(),
    supabase.from("biography_blocks").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-fluid-xl font-semibold text-ink">Biography</h1>
        <p className="mt-1 text-fluid-sm text-ink-soft">
          The eyebrow, heading, intro, and paragraph vignettes on the Biography section.
        </p>
      </div>
      {searchParams.saved === "1" && (
        <p className="flex items-center gap-2 rounded-xl bg-pigment-teal/10 px-4 py-3 text-fluid-sm text-pigment-teal">
          <CheckCircle2 size={16} /> Saved.
        </p>
      )}
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <IntroForm action={updateBiographyIntro} intro={intro} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-fluid-lg font-semibold text-ink">Paragraph blocks</h2>
            <p className="mt-1 text-fluid-sm text-ink-soft">
              Each block pairs a paragraph with a portrait image, shown in order.
            </p>
          </div>
          <Link
            href="/admin/biography/blocks/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta"
          >
            <Plus size={16} /> Add block
          </Link>
        </div>

        {blocksError && (
          <p className="rounded-xl bg-pigment-crimson/10 px-4 py-3 text-fluid-sm text-pigment-crimson">
            Failed to load blocks: {blocksError.message}
          </p>
        )}

        {!blocksError && (blocks?.length ?? 0) === 0 && (
          <p className="text-fluid-sm text-ink-faint">
            No blocks yet — the site falls back to its default paragraphs until you add some here.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {blocks?.map((block) => (
            <div
              key={block.id}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas-paper">
                {block.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  (<img src={block.image_url} alt="" className="h-full w-full object-cover" />)
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-fluid-sm font-medium text-ink">
                  {block.body_en || <span className="text-ink-faint">(no English text yet)</span>}
                </div>
                <div className="text-fluid-xs text-ink-faint">order {block.sort_order}</div>
              </div>
              <Link
                href={`/admin/biography/blocks/${block.id}`}
                aria-label="Edit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:border-pigment-terracotta hover:text-pigment-terracotta"
              >
                <Pencil size={15} />
              </Link>
              <DeleteButton
                action={deleteBiographyBlock.bind(null, block.id)}
                confirmMessage="Delete this paragraph block? This can't be undone."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
