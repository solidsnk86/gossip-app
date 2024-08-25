import Link from "next/link";
import { Format } from "./actions/FormatClass";
import React from "react";
import { Tooltip } from "./Tooltip";

type PostsProps = {
  id: string | number;
  avatar_url: string;
  user_metadata: string;
  city: string;
  created_at: string | number | Date;
  title?: string;
  message: string;
  url: string;
};

export const ServerPosts: React.FC<PostsProps> = ({
  id,
  avatar_url,
  user_metadata,
  city,
  created_at,
  title,
  message,
  url,
}) => {
  return (
    <article
      key={id}
      className="flex flex-col space-y-2 bg-btn-background border dark:border-zinc-800 rounded-2xl relative home-posts"
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
        <h4>{title}</h4>
        <p className="text-pretty text-foreground">{message}</p>
        {url ? (
          <div className="flex items-center justify-end">
            <Link
              href={url}
              target="_blank"
              title={`Ir a ${url}`}
              className="w-fit hover:bg-zinc-800 rounded-md px-2 py-1 select-none cursor-pointer"
            >
              Link
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between"></div>
        )}
      </section>
    </article>
  );
};
