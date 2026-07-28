const LANGS = [
  { code: "ku", label: "Kurdish (default)", dir: "rtl" as const },
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "Arabic", dir: "rtl" as const },
];

interface LocalizedFieldProps {
  name: string;
  label: string;
  defaults?: { ku?: string; en?: string; ar?: string };
  multiline?: boolean;
  required?: boolean;
}

/**
 * Three stacked inputs (ku/en/ar) sharing one `name` prefix — rendered as
 * `${name}_ku`, `${name}_en`, `${name}_ar` in the submitted FormData, which
 * matches the *_ku/*_en/*_ar column naming used across every content table.
 * Each field's own dir flips to rtl/ltr per language, independent of the
 * admin UI's own (always ltr) layout.
 */
const fieldClassName =
  "w-full resize-none rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none transition-colors focus:border-pigment-terracotta";

export function LocalizedField({ name, label, defaults, multiline, required }: LocalizedFieldProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-fluid-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
        {label}
      </legend>
      {LANGS.map((lang) => {
        const fieldName = `${name}_${lang.code}`;
        const defaultValue = defaults?.[lang.code as "ku" | "en" | "ar"] ?? "";
        return (
          <label key={lang.code} className="flex flex-col gap-1.5">
            <span className="text-fluid-xs text-ink-faint">{lang.label}</span>
            {multiline ? (
              <textarea
                name={fieldName}
                dir={lang.dir}
                required={required}
                defaultValue={defaultValue}
                rows={3}
                className={fieldClassName}
              />
            ) : (
              <input
                name={fieldName}
                dir={lang.dir}
                required={required}
                defaultValue={defaultValue}
                className={fieldClassName}
              />
            )}
          </label>
        );
      })}
    </fieldset>
  );
}
