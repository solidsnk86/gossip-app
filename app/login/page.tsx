import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInWithGitHub = async () => {
    "use server";

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://gossip-app.vercel.app/auth/callback",
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(data.url);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center mx-auto gap-2">
      <Link
        href="/"
        className="absolute left-4 top-4 xl:left-8 xl:top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Volver
      </Link>

      <form
        action={signInWithGitHub}
        className="grid bg-primary-foreground mx-auto w-full justify-center gap-2 text-foreground p-12 border border-foreground/5 rounded-xl z-50"
      >
        <h3 className="text-center font-semibold text-3xl pb-2">
          Inciar sesión
        </h3>
        <button
          className="bg-btn-background rounded-md py-1 px-4 text-foreground mb-2 flex items-center justify-center hover:bg-btn-background-hover transition-all duration-300 outline-1 outline-offset-2 outline-foreground/10 outline border border-foreground/10"
          type="submit"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <path
              fill="currentColor"
              d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 0z"
            />
          </svg>
          Ingresa con GitHub
        </button>
        <small className="text-center text-[10px] text-foreground dark:text-zinc-400 mt-2">
          Al continuar, acepta los Términos de servicio y la Política de
          privacidad de ChismeApp.
        </small>
        {searchParams?.message && (
          <small className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </small>
        )}
      </form>
    </div>
  );
}
