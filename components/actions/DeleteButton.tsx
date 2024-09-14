"use client";

import React from "react";
import { Trash } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { DeleteButtonProps } from "@/app/types/definitions";

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  title,
  onDelete,
}) => {
  async function handleDelete(id: string | number) {
    const { error } = await supabase.from("gossip").delete().eq("id", id);

    if (error) {
      console.error("Error at delete gossip from database:", error.message);
      return;
    }

    onDelete();
  }

  return (
    <span
      className="absolute right-5 justify-end dark:hover:bg-zinc-800 hover:bg-zinc-300 p-2 rounded-full cursor-pointer"
      title={`Eliminar chisme del ${title}`}
      onClick={() => handleDelete(id)}
    >
      <Trash className="w-[18px] h-[18px] text-zinc-600 dark:text-zinc-400" />
    </span>
  );
};
