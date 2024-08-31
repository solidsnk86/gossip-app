import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Format } from "./actions/FormatClass";
import { EditButton } from "./actions/EditButton";

type ProfileHeaderProps = {
  id: string | number;
  fullName: string;
  user: string;
  avatar: string;
  editable?: boolean;
  city: string;
  country: string;
  createdAt: string | number;
  onEdit: (id: string | number) => void;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  id,
  fullName,
  user,
  avatar,
  editable,
  city,
  country,
  createdAt,
  onEdit,
}) => {
  return (
    <header
      className="flex flex-col w-[100%] border-b border-foreground/10"
      key={id}
    >
      <div className="relative">
        <img
          src="/Screenshot_20240720-223312.png"
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
      <span className="relative float-right top-6">
        <EditButton onEdit={() => onEdit(id)} title={user} />
      </span>
      <div className="px-5 pt-[66px]">
        <p className="text-2xl font-bold">{fullName}</p>
        <p className="text-zinc-400">@{user}</p>
      </div>
      <main className="px-5 mt-2">
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={() => {}}
        >
          Front End Developer - React | Next.js | Node.js | Javascript |
          Supabase | PostgreeSQL | Python
        </p>
      </main>
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
