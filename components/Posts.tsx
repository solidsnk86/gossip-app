import React from "react";
import Link from "next/link";
import { Format } from "./actions/FormatClass";
import { DeleteButton } from "@/components/actions/DeleteButton";
import { EditButton } from "./actions/EditButton";

type PostsProps = {
  id: string | number;
  avatar_url: string;
  user_metadata: string;
  city: string;
  created_at: string | number | Date;
  title: string;
  message: string;
  url: string;
  editable: boolean;
  onDelete?: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onSave: (
    id: string | number,
    title: string,
    message: string,
    edited: boolean
  ) => void;
  edited: boolean;
};

export const Posts: React.FC<PostsProps> = ({
  id,
  avatar_url,
  user_metadata,
  city,
  created_at,
  title,
  message,
  url,
  editable,
  onDelete,
  onEdit,
  onSave,
  edited,
}) => {
  return (
    <article
      key={id}
      id={`gossip-${id}`}
      className="flex flex-col space-y-2 bg-zinc-800/60 border border-zinc-800 rounded-2xl relative"
    >
      <header className="flex gap-[10px] items-center border-b border-zinc-800 p-4">
        <img
          src={avatar_url}
          width={38}
          height={38}
          alt={`Avatar de ${user_metadata}`}
          className="rounded-lg"
        />
        <aside className="flex flex-col cursor-default">
          <small className="font-semibold">{user_metadata}</small>
          <small className="text-zinc-400 font-light">
            {city} • <span>{Format.dateAndTime(created_at)}</span>
          </small>
          <small className="text-zinc-400 text-xs">
            {edited === true ? "(editado)" : null}
          </small>
        </aside>
        <EditButton onEdit={() => onEdit(id)} />
        <DeleteButton
          onDelete={() => onDelete && onDelete(id)}
          id={id}
          title={title as string}
        />
      </header>
      <section className="space-y-2 p-4">
        <h4
          id="title"
          contentEditable={editable}
          suppressContentEditableWarning={true}
        >
          {title}
        </h4>
        <p
          id="message"
          className="text-pretty text-zinc-400"
          contentEditable={editable}
          suppressContentEditableWarning={true}
        >
          {message}
        </p>
        {url ? (
          <Link
            href={url}
            title={`Ir a ${url}`}
            target="_blank"
            className="float-right w-fit hover:bg-zinc-800 rounded-md px-2 py-1 select-none cursor-pointer"
          >
            Link
          </Link>
        ) : null}
        {editable && (
          <button
            onClick={() => {
              const gossipId = document.getElementById(`gossip-${id}`);
              const newTitle = gossipId?.querySelector("#title")?.textContent;
              const edited = true;
              const newMessage =
                gossipId?.querySelector("#message")?.textContent;
              onSave(id, newTitle as string, newMessage as string, edited);
            }}
            className="px-2 py-1 bg-zinc-800 rounded-lg border border-foreground/10 w-fit hover:brightness-125 cursor-pointer"
          >
            Guardar
          </button>
        )}
      </section>
    </article>
  );
};