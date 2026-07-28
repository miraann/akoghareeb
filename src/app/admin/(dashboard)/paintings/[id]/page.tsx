import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PaintingForm } from "../PaintingForm";
import { updatePainting } from "../actions";

export default async function EditPaintingPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: painting } = await supabase.from("paintings").select("*").eq("id", params.id).single();

  if (!painting) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-fluid-xl font-semibold text-ink">Edit painting</h1>
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <PaintingForm action={updatePainting.bind(null, painting.id)} painting={painting} />
      </div>
    </div>
  );
}
