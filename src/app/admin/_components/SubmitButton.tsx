"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-2.5 text-fluid-sm font-medium text-canvas transition-colors hover:bg-pigment-terracotta disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
