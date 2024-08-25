"use client";

import React from "react";
import { Pencil } from "lucide-react";

type EditButtonProps = {
  onEdit: () => void;
};

export const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <span
      className="absolute right-14 hover:bg-zinc-800 p-2 rounded-full"
      onClick={onEdit}
    >
      <Pencil className="w-[18px] h-[18px] cursor-pointer" />
    </span>
  );
};
