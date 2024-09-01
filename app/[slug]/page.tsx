import { LogoIcon } from "@/components/LogoIcon";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import ProtectedPageClient from "@/components/ProtectedPageClient";
import SideBarLayout from "@/components/Layout";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.aud !== "authenticated") {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("gossip")
    .select("*")
    .eq("full_name", user?.user_metadata.full_name)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Something went wrong", error);
  }

  return (
    <SideBarLayout userProfile={user?.user_metadata.user_name}>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-slate-300/15 backdrop-blur-md fixed top-0 left-0 z-50">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <LogoIcon />
            <AuthButton />
          </div>
        </nav>

        <ProtectedPageClient user={user} initialData={data} />

        <Footer />
      </div>
    </SideBarLayout>
  );
}
