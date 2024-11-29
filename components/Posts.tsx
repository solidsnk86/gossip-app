import React from "react";
import Link from "next/link";
import { Format } from "./actions/FormatClass";
import { DeleteButton } from "@/components/actions/DeleteButton";
import { EditButton } from "./actions/EditButton";
import { ShareButton } from "./actions/ShareButton";
import { PostsProps } from "@/app/types/definitions";
import Image from "next/image";
import generateSlug from "@/lib/generateSlug";

export const Posts: React.FC<PostsProps> = ({
  id,
  avatar_url,
  user_metadata,
  city,
  created_at,
  message,
  url,
  editable,
  onDelete,
  onEdit,
  onSave,
  edited,
  slug,
}) => {
  return (
    <section
      key={id}
      id={`gossip-${id}`}
      className="flex flex-col space-y-2 bg-primary-foreground border border-foreground/5  rounded-2xl relative"
    >
      <header className="flex gap-[10px] items-center border-b border-foreground/5 p-4">
        <Image
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
        </aside>
        <EditButton
          onEdit={() => onEdit && onEdit(id)}
          className="right-16"
          title={Format.dateAndTime(created_at)}
        />
        <DeleteButton
          onDelete={() => onDelete && onDelete(id)}
          id={id}
          title={Format.dateAndTime(created_at)}
        />
      </header>
      <div className="space-y-2 p-4 relative">
        <small className="text-zinc-400 text-xs absolute right-[26px] top-1">
          {edited === true ? "(editado)" : null}
        </small>
        <p
          id="message"
          className="text-pretty text-zinc-400"
          contentEditable={editable}
          suppressContentEditableWarning={true}
        >
          {message}
        </p>
        <div className="flex items-center justify-between">
          <ShareButton message={message as string} url={url} />
          {url ? (
            <Link
              href={url}
              target="_blank"
              title={`Ir a ${url}`}
              className="w-fit bg-btn-background hover:bg-btn-background-hover rounded-md px-2 py-1 select-none cursor-pointer"
            >
              Link
            </Link>
          ) : null}
        </div>
        {editable && (
          <button
            onClick={() => {
              const gossipId = document.getElementById(`gossip-${id}`);
              const edited = true;
              const newMessage =
                gossipId?.querySelector("#message")?.textContent;
              onSave && onSave(id, newMessage as string, edited);
            }}
            className="px-2 py-1 bg-btn-background hover:bg-btn-background-hover rounded-lg border border-foreground/10 w-fit cursor-pointer z-30"
          >
            Guardar
          </button>
        )}
      </div>
    </section>
  );
};
