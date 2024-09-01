import React, { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Format } from "./actions/FormatClass";
import { EditButton } from "./actions/EditButton";

type ProfileHeaderProps = {
  id: string | number;
  fullName: string;
  user: string;
  avatar: string;
  city: string;
  country: string;
  createdAt: string | number;
  content: string | number | any;
  editable?: boolean;
  onEdit: (id: string | number) => void;
  onSave: (content: string) => void;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  id,
  fullName,
  user,
  avatar,
  city,
  country,
  createdAt,
  content,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

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
      <span className="relative float-right top-6"></span>
      <div className="px-5 pt-[66px]">
        <p className="text-2xl font-bold">{fullName}</p>
        <p className="text-zinc-400">@{user}</p>
      </div>
      <main className="px-5 mt-2 relative">
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded-md bg-transparent border-foreground/10 text-foreground text-pretty"
            />
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-btn-background hover:bg-btn-background-hover rounded-lg border border-foreground/10 w-fit cursor-pointer mt-2"
            >
              Guardar
            </button>
          </>
        ) : (
          <>
            <p className="text-pretty w-11/12">{content}</p>
            <div className="absolute -top-10 right-0">
              <EditButton
                onEdit={handleEdit}
                title={user}
                className="right-5 -top-[72px]"
              />
            </div>
          </>
        )}
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
