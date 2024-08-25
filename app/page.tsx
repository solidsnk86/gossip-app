import { LogoIcon } from "../components/LogoIcon";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { ServerPosts } from "@/components/ServerPosts";
import { BgGrid } from "@/components/svg/BG-Grid";
import { Footer } from "@/components/Footer";
import SideBarLayout from "@/components/Layout";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("gossip")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Could not get data", error);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SideBarLayout userProfile={user && user.user_metadata.user_name}>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-slate-300/15 backdrop-blur-md fixed top-0 left-0 z-50">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <LogoIcon />
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>

        <div className="mt-24 px-3 max-w-3xl">
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl my-[70px] text-center">
              Últimos chismes de la semana! ✨
            </h2>
            {data && data.length > 0 ? (
              data &&
              data.map((d) => (
                <ServerPosts
                  id={d.id}
                  avatar_url={d.avatar_url}
                  user_metadata={d.full_name}
                  city={d.city}
                  title={d.title}
                  message={d.message}
                  url={d.url}
                  created_at={d.created_at}
                />
              ))
            ) : (
              <h4>Nada de chismes por aquí...🥱</h4>
            )}
          </main>
        </div>

        <div className="border border-foreground/10 rounded-3xl overflow-hidden bg-indigo-400/20">
          <BgGrid className="w-full h-auto" />
        </div>

        <Footer />
      </div>
    </SideBarLayout>
  );
}
