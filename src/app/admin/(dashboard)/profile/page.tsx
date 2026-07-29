import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./ProfileForm";
import { updateProfile } from "./actions";

export default async function AdminProfilePage(
  props: {
    searchParams: Promise<{ saved?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const supabase = createClient();
  const { data: profile } = await supabase.from("site_profile").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-fluid-xl font-semibold text-ink">Homepage profile</h1>
        <p className="mt-1 text-fluid-sm text-ink-soft">
          The name, tagline, bio, and portrait shown on the homepage hero.
        </p>
      </div>

      {searchParams.saved === "1" && (
        <p className="flex items-center gap-2 rounded-xl bg-pigment-teal/10 px-4 py-3 text-fluid-sm text-pigment-teal">
          <CheckCircle2 size={16} /> Saved.
        </p>
      )}

      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <ProfileForm action={updateProfile} profile={profile} />
      </div>
    </div>
  );
}
