import { createClient } from "@/utils/supabase/server";
import { AuthButtonClient } from "./AuthButtonClient";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <AuthButtonClient user={user} signOut={signOut} />
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Iniciar Sesión
    </Link>
  );
}
