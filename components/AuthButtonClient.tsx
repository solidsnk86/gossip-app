"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Home, LogOut, Share2 } from "lucide-react";

export function AuthButtonClient({
  user,
  signOut,
}: {
  user: any;
  signOut: () => Promise<void>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex items-center gap-4">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          className="rounded-full border border-zinc-500"
          src={user.user_metadata.avatar_url}
          width={33}
          height={33}
          alt="User Avatar"
        />
        <span className="hidden md:block">
          Hey, {user.user_metadata.user_name}!
        </span>
      </button>

      <div className="md:hidden">
        {isMenuOpen && (
          <div className="absolute top-10 right-0 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10">
            <Link
              className="block px-4 py-2 text-sm text-white hover:bg-zinc-700 rounded-t-lg"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5 inline mr-3" />
              Inicio
            </Link>
            <Link
              href={`/${user.user_metadata.user_name}`}
              className="block px-4 py-2 text-sm text-white hover:bg-zinc-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5 inline mr-3" />
              Perfil
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: document.title,
                    text: "Ey! que esperas... Ven y traéme tu chisme! 🧉",
                    url: location.href,
                  });
                }
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
              aria-disabled
            >
              <Share2 className="w-5 h-5 inline mr-3" />
              Compartir
            </button>
            <button
              onClick={async () => {
                setIsMenuOpen(false);
                await signOut();
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 rounded-b-lg"
            >
              <LogOut className="w-5 h-5 inline mr-3" />
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <form action={signOut}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Cerrar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
