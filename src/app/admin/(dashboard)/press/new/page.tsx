import { PressForm } from "../PressForm";
import { createPressItem } from "../actions";

export default function NewPressItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-fluid-xl font-semibold text-ink">Add press item</h1>
      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <PressForm action={createPressItem} />
      </div>
    </div>
  );
}
