"use client";

import React, { useState, useEffect } from "react";
import { GossipFormClient } from "@/components/GossipForm";
import { Posts } from "@/components/Posts";
import { supabase } from "@/utils/supabase/client";
import { ProfileHeader } from "./ProfileHeader";
import { PostsLength } from "./PostsLength";

export default function ProtectedPageClient({
  user,
  initialData,
}: {
  user: any;
  initialData: any;
}) {
  const [data, setData] = useState(initialData);
  const [dataLocation, setDataLocation] = useState<any>(null);
  const [editablePostId, setEditablePostId] = useState<string | number | null>(
    null
  );
  const [profileContent, setProfileContent] = useState("");
  const [profileHeaderId, setProfileHeaderId] = useState<number | null>(null);

  const getLocation = async () => {
    try {
      const api = {
        url: "https://geolocation.microlink.io",
      };
      const res = await fetch(api.url);
      const data = await res.json();

      if (!res.ok) {
        const rateLimit = res.headers.get("X-RateLimit-Limit");
        const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
        if (res.status === 429) {
          console.error(
            `Rate limit exceeded. Try again later. Limit: ${rateLimit}, Remaining: ${rateLimitRemaining}`
          );
          return;
        }
        console.error(`Failed to get data: ${res.status} ${res.statusText}`);
      }

      setDataLocation(data);
    } catch (err) {
      console.error("API limit", err);
    }
  };

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
    newMessage: string,
    edited: boolean
  ) => {
    const { data: updatedData, error } = await supabase
      .from("gossip")
      .update({ message: newMessage, edited: true })
      .match({ id })
      .select();

    if (error) {
      console.error("Cannot save data", error.message);
    } else if (updatedData) {
      setData(
        data.map((post: any) =>
          post.id === id ? { ...post, message: newMessage, edited } : post
        )
      );
      setEditablePostId(null);
    }
  };

  const handleSaveContent = async (newContent: string) => {
    if (profileHeaderId === null) {
      const { data: insertedData, error: insertError } = await supabase
        .from("profile_header")
        .insert({ content: newContent, user_id: user.id })
        .select()
        .single();

      if (insertError) {
        console.error("Error creating profile header", insertError.message);
        return;
      }

      setProfileHeaderId(insertedData.id);
      setProfileContent(newContent);
    } else {
      const { data: updatedData, error: updateError } = await supabase
        .from("profile_header")
        .update({ content: newContent })
        .eq("id", profileHeaderId)
        .select();

      if (updateError) {
        console.error("Error updating content profile", updateError.message);
        return;
      }
    }

    setProfileContent(newContent);
  };

  const getContent = async () => {
    const { data, error } = await supabase
      .from("profile_header")
      .select("id, content")
      .eq("user_id", user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        console.log("No profile header found for this user");
      } else {
        console.error("Error fetching profile content", error.message);
      }
    } else if (data) {
      setProfileHeaderId(data.id);
      setProfileContent(data.content || "");
    }
  };

  useEffect(() => {
    getLocation();
    getContent();
  }, []);

  return (
    <div className="w-full gap-20 items-center">
      <div className="mt-16">
        <ProfileHeader
          id={user.id}
          avatar={user.user_metadata.avatar_url}
          fullName={user.user_metadata.full_name}
          user={user.user_metadata.user_name}
          city={dataLocation?.city?.name}
          country={dataLocation?.country?.name}
          createdAt={user.created_at}
          onEdit={handleEdit}
          onSave={handleSaveContent}
          content={profileContent}
        />
        <GossipFormClient
          ip={dataLocation?.ip?.address}
          city={dataLocation?.city?.name}
          country={dataLocation?.country?.name}
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
                  message: string;
                  avatar_url: string;
                  url: string;
                  created_at: string | number | Date;
                  edited: boolean;
                  slug: string | undefined;
                }) => (
                  <Posts
                    key={d.id}
                    id={d.id}
                    avatar_url={d.avatar_url}
                    user_metadata={d.full_name}
                    city={d.city}
                    created_at={d.created_at}
                    message={d.message}
                    url={d.url}
                    editable={d.id === editablePostId}
                    onDelete={handleRefresh}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    edited={d.edited === true}
                    slug={d.slug}
                  />
                )
              )}
          </section>
        </main>
      </div>
    </div>
  );
}
