"use client";

import React from "react";
import { Pencil } from "lucide-react";

type EditButtonProps = {
  onEdit: () => void;
  title: string;
};

export const EditButton: React.FC<EditButtonProps> = ({ onEdit, title }) => {
  return (
    <span
      className="absolute right-14 dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer"
      title={`Editar ${title}`}
      onClick={onEdit}
    >
      <Pencil className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
