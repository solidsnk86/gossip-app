"use client";

import React, { useState } from "react";
import { GossipFormClient } from "@/components/GossipForm";
import { Posts } from "@/components/Posts";
import { supabase } from "@/utils/supabase/client";
import { ProfileHeader } from "./ProfileHeader";
import { PostsLength } from "./PostsLength";

export default function ProtectedPageClient({
  user,
  initialData,
  dataLocation,
}: {
  user: any;
  initialData: any;
  dataLocation: any;
}) {
  const [data, setData] = useState(initialData);
  const [editablePostId, setEditablePostId] = useState<string | number | null>(
    null
  );

  const handleRefresh = async () => {
    const { data: refreshedData, error } = await supabase
      .from("gossip")
      .select("*")
      .eq("user_name", user.user_metadata.user_name)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error.message);
      return;
    }

    setData(refreshedData);
  };

  const handleEdit = (id: any) => {
    setEditablePostId(id);
  };

  const handleSave = async (
    id: string | number,
    newTitle: string,
    newMessage: string,
    edited: boolean
  ) => {
    const { data: updatedData, error } = await supabase
      .from("gossip")
      .update({ title: newTitle, message: newMessage, edited: true })
      .match({ id })
      .select();

    if (error) {
      console.error("Cannot save data", error.message);
    } else if (updatedData) {
      setData(
        data.map((post: any) =>
          post.id === id
            ? { ...post, title: newTitle, message: newMessage, edited }
            : post
        )
      );
      setEditablePostId(null);
    }
  };

  return (
    <div className="w-full gap-20 items-center">
      <div className="mt-16">
        <ProfileHeader
          avatar={user.user_metadata.avatar_url}
          fullName={user.user_metadata.full_name}
          user={user.user_metadata.user_name}
          city={dataLocation.city.name}
          country={dataLocation.country.name}
          createdAt={user.created_at}
        />
        <GossipFormClient
          ip={dataLocation.ip.address}
          city={dataLocation.city.name}
          country={dataLocation.country.name}
          fullName={user.user_metadata.full_name}
          userName={user.user_metadata.user_name}
          avatar={user.user_metadata.avatar_url}
          onRefresh={handleRefresh}
        />
        <main className="flex-1 flex flex-col px-3 max-w-3xl justify-center mx-auto">
          <section className="flex flex-col gap-6">
            <PostsLength dataLength={data} />
            {data &&
              data.map(
                (d: {
                  id: number | string;
                  full_name: string;
                  city: string;
                  title: string | undefined;
                  message: string;
                  avatar_url: string;
                  url: string;
                  created_at: string | number | Date;
                  edited: boolean;
                }) => (
                  <Posts
                    key={d.id}
                    id={d.id}
                    avatar_url={d.avatar_url}
                    user_metadata={d.full_name}
                    city={d.city}
                    created_at={d.created_at}
                    title={d.title as string}
                    message={d.message}
                    url={d.url}
                    editable={d.id === editablePostId}
                    onDelete={handleRefresh}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    edited={d.edited === true}
                  />
                )
              )}
          </section>
        </main>
      </div>
    </div>
  );
}