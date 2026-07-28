import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PressForm } from "../PressForm";
import { updatePressItem } from "../actions";

export default async function EditPressItemPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("press_media").select("*").eq("id", params.id).single();

  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-fluid-xl font-semibold text-ink">Edit press item</h1>
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <PressForm action={updatePressItem.bind(null, item.id)} item={item} />
      </div>
    </div>
  );
}
