"use client";

import React from "react";
import { Pencil } from "lucide-react";

type EditButtonProps = {
  className?: string;
  onEdit: () => void;
  title: string;
};

export const EditButton: React.FC<EditButtonProps> = ({
  onEdit,
  title,
  className,
}) => {
  return (
    <span
      className={`absolute dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer ${className}`}
      title={`Editar publicación del ${title}`}
      onClick={onEdit}
    >
      <Pencil className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
