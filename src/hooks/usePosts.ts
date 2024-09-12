import { INewsArticle } from "@/components/shared/news-article";
import { Post, Profile, Tag, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type Posts = Array<
  Post & {
    creator: { profile: Profile };
    tags: Tag[];
  }
>;

export default function usePosts() {
  return useQuery({
    queryFn: async (): Promise<{ posts: Posts }> => {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    },

    queryKey: ["posts"],
  });
}
