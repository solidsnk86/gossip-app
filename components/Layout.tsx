import { User2, Home, Bell, Mail, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Share } from "./actions/Sahare";

export default async function SideBarLayout({
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
          {[
            {
              name: "Inicio",
              url: "/",
              icon: <Home className="w-5 h-5 inline mr-6" />,
            },
            {
              name: "Notificaciones",
              url: userProfile !== null ? "/notifications" : "/login",
              icon: <Bell className="w-5 h-5 inline mr-6" />,
            },
            {
              name: "Mensajes",
              url: "/login",
              icon: <Mail className="w-5 h-5 inline mr-6" />,
            },
            {
              name: "Perfil",
              url: userProfile !== null ? `/${userProfile}` : "/login",
              icon: <User2 className="w-5 h-5 inline mr-6" />,
            },
          ].map((list) => (
            <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
              <Link
                href={list.url}
                className={`text-xl font-medium text-foreground flex items-center w-full p-2 ${
                  list.name === "Mensajes" ? "cursor-not-allowed" : ""
                }`}
              >
                {list.icon}
                {list.name}
              </Link>
            </li>
          ))}
          <li className="flex items-center hover:bg-btn-background-hover dark:hover:bg-zinc-800 rounded-lg">
            <Share />
          </li>
        </ul>
      </aside>
      <main className="flex-1 flex flex-col justify-center mx-auto">
        {children}
      </main>
    </>
  );
}
