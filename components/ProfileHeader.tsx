import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Format } from "./actions/FormatClass";

type ProfileHeaderProps = {
  fullName: string;
  user: string;
  avatar: string;
  coverImage?: string;
  city: string;
  country: string;
  createdAt: string | number;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  user,
  avatar,
  coverImage,
  city,
  country,
  createdAt,
}) => {
  return (
    <header className="flex flex-col w-[100%] border-b border-foreground/10">
      <div className="relative">
        <img
          src="https://www.transparenttextures.com/patterns/asfalt-dark.png"
          alt="Cover"
          className="w-full h-40 object-cover"
        />
        <div className="absolute left-5 bottom-[-60px]">
          <img
            src={avatar}
            width={130}
            height={160}
            className="rounded-full border-4 border-background"
            alt="Avatar"
          />
        </div>
      </div>
      <div className="px-5 pt-[66px]">
        <p className="text-2xl font-bold">{fullName}</p>
        <p className="text-zinc-400">@{user}</p>
      </div>
      <aside className="grid text-zinc-400 my-4 px-5">
        <small className="flex items-center">
          <MapPin className="inline w-4 h-4 mr-1 -translate-y-[2px]" />
          {city}, {country}
        </small>
        <small className="flex items-center">
          <CalendarDays className="inline w-4 h-4 mr-1 -translate-y-[2px]" />
          Se unió en {Format.monthYear(createdAt)}
        </small>
      </aside>
    </header>
  );
};
