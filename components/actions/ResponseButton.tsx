"use client";

import { MessageSquareMore } from "lucide-react";
import React from "react";

type ResponseButtonProps = {
  user: string;
  onResponse?: () => void;
};

export const ResponseButton: React.FC<ResponseButtonProps> = ({
  user,
  onResponse,
}) => {
  return (
    <div
      className="dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer"
      title={`Responder a ${user}`}
      onClick={onResponse}
    >
      <MessageSquareMore className="inline w-5 h-5" />
    </div>
  );
};
