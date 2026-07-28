import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "../_components/AdminShell";

// Defense in depth: middleware already guards /admin, but every protected
// server render re-checks the session directly rather than trusting it was
// already verified upstream.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
