"use client";

import { Share2 } from "lucide-react";

export const Share = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Ey! que esperas... Ven y traéme tu chisme! 🧉",
        url: location.href,
      });
    }
  };
  return (
    <button
      onClick={handleShare}
      className="text-xl font-medium text-foreground flex items-center w-full p-2"
    >
      <Share2 className="w-5 h-5 inline mr-6" />
      Compartir
    </button>
  );
};
