import Link from "next/link";
import { Format } from "./actions/FormatClass";
import React from "react";
import { Tooltip } from "./Tooltip";
import { ShareButton } from "./actions/ShareButton";
import { HomePostsProps } from "@/app/types/definitions";

export const HomePosts: React.FC<HomePostsProps> = ({
  id,
  avatar_url,
  user_metadata,
  city,
  created_at,
  message,
  url,
}) => {
  return (
    <article
      key={id}
      className="flex flex-col space-y-2 bg-primary-foreground border border-foreground/5 rounded-2xl relative home-posts"
    >
      <header className="flex gap-[10px] items-center border-b dark:border-zinc-800 p-4">
        <img
          src={avatar_url}
          width={38}
          height={38}
          alt={`Avatar de ${user_metadata}`}
          className="rounded-lg"
        />
        <aside className="flex flex-col cursor-default">
          <small className="font-semibold">{user_metadata}</small>
          <small className=" text-foreground font-light">
            {city} •{" "}
            <Tooltip title={Format.dateAndTime(created_at)}>
              <span className="hover:underline">{Format.date(created_at)}</span>
            </Tooltip>
          </small>
        </aside>
      </header>
      <section className="space-y-2 p-4">
        <p className="text-pretty text-foreground">{message}</p>
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
      </section>
    </article>
  );
};
