import { User2, Home, Bell, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SideBarLayout({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: string;
}) {
  return (
    <>
      <aside className="hidden lg:block lg:w-[260px] xl:w-[300px] top-16 sticky h-screen border-r border-foreground/10 p-6">
        <ul className="space-y-4 p-0 m-0 list-none">
          <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
            <Link
              href="/"
              className="text-xl font-medium text-foreground flex items-center w-full p-2"
            >
              <Home className="w-5 h-5 inline mr-6" />
              Inicio
            </Link>
          </li>
          <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
            <Link
              href="#"
              className="text-xl font-medium text-foreground flex items-center w-full p-2 cursor-not-allowed"
              aria-disabled
            >
              <Bell className="w-5 h-5 inline mr-6" />
              Notificaciones
            </Link>
          </li>
          <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
            <Link
              href="#"
              className="text-xl font-medium text-foreground flex items-center w-full p-2 cursor-not-allowed"
              aria-disabled
            >
              <Mail className="w-5 h-5 inline mr-6" />
              Mensajes
            </Link>
          </li>
          <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
            {userProfile !== null ? (
              <Link
                href={`/${userProfile}`}
                className="text-xl font-medium text-foreground flex items-center w-full p-2"
              >
                <User2 className="w-5 h-5 inline mr-6" />
                Perfil
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xl font-medium text-foreground flex items-center w-full p-2"
              >
                <User2 className="w-5 h-5 inline mr-6" />
                Perfil
              </Link>
            )}
          </li>
        </ul>
      </aside>
      <main className="flex-1 flex flex-col justify-center mx-auto">
        {children}
      </main>
    </>
  );
}
