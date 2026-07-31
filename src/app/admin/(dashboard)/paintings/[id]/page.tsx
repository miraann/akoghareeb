import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaintingForm } from "../PaintingForm";
import { updatePainting } from "../actions";

export default async function EditPaintingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = createClient();
  const [{ data: painting }, { data: categories }] = await Promise.all([
    supabase.from("paintings").select("*").eq("id", params.id).single(),
    supabase.from("painting_categories").select("*").order("sort_order", { ascending: true }),
  ]);

  if (!painting) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">دەستکاریکردنی تابلۆ</h1>
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <PaintingForm
          action={updatePainting.bind(null, painting.id)}
          painting={painting}
          categories={categories ?? []}
        />
      </div>
    </div>
  );
}
