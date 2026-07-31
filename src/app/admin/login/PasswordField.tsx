"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        className="w-full rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 pl-10 text-fluid-sm text-ink outline-none transition-colors focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "شاردنەوەی وشەی نهێنی" : "پیشاندانی وشەی نهێنی"}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-faint transition-colors hover:text-ink"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
