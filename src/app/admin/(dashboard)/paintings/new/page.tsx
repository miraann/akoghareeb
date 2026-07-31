import { createClient } from "@/lib/supabase/server";
import { PaintingForm } from "../PaintingForm";
import { createPainting } from "../actions";

export default async function NewPaintingPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from("painting_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-kurdish text-fluid-xl font-semibold text-ink">زیادکردنی تابلۆ</h1>
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <PaintingForm action={createPainting} categories={categories ?? []} />
      </div>
    </div>
  );
}
