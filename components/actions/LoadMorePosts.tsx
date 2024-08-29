"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { HomePosts } from "../HomePosts";

export default function LoadMorePosts({ initialPosts }: { initialPosts: any }) {
  const [posts, setPosts] = useState<any>(initialPosts || []);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gossip")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)
      .range(posts.length, posts.length + 9);

    if (error) {
      console.error("Cannot load more posts", error.message);
    } else {
      setPosts((prevPosts: []) => [...prevPosts, ...data]);
    }
    setLoading(false);
  };

  return (
    <>
      {posts.map((post: any) => (
        <HomePosts
          key={post.id}
          id={post.id}
          avatar_url={post.avatar_url}
          user_metadata={post.full_name}
          city={post.city}
          message={post.message}
          url={post.url}
          created_at={post.created_at}
        />
      ))}
      <button
        onClick={loadMore}
        disabled={loading}
        className="mt-4 p-2 bg-[#8bf98b] text-black font-semibold rounded"
      >
        {loading ? "Cargando..." : "Cargar más publicaciones"}
      </button>
    </>
  );
}
