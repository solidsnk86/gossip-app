import AuthButton from "@/components/AuthButton";
import SideBarLayout from "@/components/Layout";
import { LogoIcon } from "@/components/LogoIcon";
import { createClient } from "@/utils/supabase/server";
import { Footer } from "@/components/Footer";

export default async function Notifications() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SideBarLayout userProfile={user?.user_metadata.user_name}>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-slate-300/15 backdrop-blur-md fixed top-0 left-0 z-50">
          <div className="w-full flex justify-between items-center p-3 text-sm">
            <LogoIcon />
            <AuthButton />
          </div>
        </nav>

        <main className="flex-1 flex flex-col w-full">
          <h2 className="font-bold xl:text-4xl text-xl mt-[85px] text-center">
            Notificaciones
          </h2>
          <div className="border-t border-foreground/10 h-screen mt-4 border-b">
            {user ? (
              <article className="p-6 bg-zinc-800/50 text-pretty">
                <p>
                  ¡Bienvenido{" "}
                  <span className="text-lime-400">
                    {user?.user_metadata.full_name}
                  </span>{" "}
                  a ChismeApp! Parece que eres nuevo aquí. Tienes algunas
                  recomendaciones para empezar:
                </p>
                <ul className="list-disc pl-8 my-2">
                  <li>
                    Explora las publicaciones: Navega por las publicaciones
                    recientes y descubre qué se está comentando en la comunidad.
                    No dudes en dejar tu opinión en los comentarios.
                  </li>
                  <li>
                    Empieza a publicar: Comparte tus ideas, historias, o lo que
                    te apasione. Puedes editar o eliminar tus publicaciones en
                    cualquier momento desde tu dashboard.
                  </li>
                  <li>
                    Mantente al día: Sigue las publicaciones de otros usuarios
                    que te interesen para recibir actualizaciones y no perderte
                    de nada.
                  </li>
                  <li>
                    Pronto podrás responder a otros usuarios: Estamos trabajando
                    en la funcionalidad de respuestas para que las
                    conversaciones sean aún más interactivas. ¡Mantente atento!
                  </li>
                </ul>
              </article>
            ) : null}
          </div>
        </main>

        <Footer />
      </div>
    </SideBarLayout>
  );
}
