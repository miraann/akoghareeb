import { signIn } from "./actions";

export const metadata = { title: "چوونەژوورەوەی بەڕێوەبردن — ئاکۆ غەریب" };

export default async function AdminLoginPage(
  props: {
    searchParams: Promise<{ error?: string; next?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === "1";
  const next = searchParams.next ?? "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-soft">
        <h1 className="font-kurdish text-fluid-lg font-semibold text-ink">چوونەژوورەوەی بەڕێوەبردن</h1>
        <p className="mt-1 text-fluid-sm text-ink-soft">داشبۆردی ناوەڕۆکی ئاکۆ غەریب</p>

        {hasError && (
          <p className="mt-4 rounded-lg bg-pigment-crimson/10 px-3 py-2 text-fluid-xs text-pigment-crimson">
            وشەی نهێنی هەڵەیە.
          </p>
        )}

        <form action={signIn} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />
          <label className="flex flex-col gap-1.5">
            <span className="text-fluid-xs font-medium text-ink-soft">وشەی نهێنی</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="rounded-xl border border-ink/15 bg-canvas px-3.5 py-2.5 text-fluid-sm text-ink outline-none transition-colors focus:border-pigment-terracotta focus:ring-2 focus:ring-pigment-terracotta/15"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-full bg-ink px-4 py-2.5 text-fluid-sm font-medium text-canvas transition-all duration-200 hover:-translate-y-0.5 hover:bg-pigment-terracotta hover:shadow-soft active:translate-y-0 active:scale-95"
          >
            چوونەژوورەوە
          </button>
        </form>
      </div>
    </div>
  );
}
