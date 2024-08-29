"use client";

import React from "react";
import { MessageSquareShareIcon } from "lucide-react";

interface ShareProps {
  message: string;
  url?: string | URL;
}

export const ShareButton: React.FC<ShareProps> = ({ message, url }) => {
  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: message,
        url: url as string,
      });
    }
  };

  return (
    <div
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 px-[6px] py-1 rounded-full"
      title={`Compartir ${message}`}
      onClick={shareContent}
    >
      <MessageSquareShareIcon className="w-5 h-5 inline text-foreground cursor-pointer text-zinc-600 dark:text-zinc-400" />
    </div>
  );
};
