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
    <Link href="/login" className="py-2 px-3 login-button hover:brightness-110">
      <div className="fancy"></div>
      <span className="text">Iniciar Sesión</span>
    </Link>
  );
}
