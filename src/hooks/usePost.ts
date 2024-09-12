"use client";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "./usePosts";

export default function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async (): Promise<{ post: Posts[number] }> => {
      const response = await fetch(`/api/posts/${slug}`);
      return await response.json();
    },
  });
}
