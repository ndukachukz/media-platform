import { NewsArticle } from "@/components/shared/news-article";
import { Text } from "@mantine/core";
import { Post, Tag, Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default async function PostsPage() {
  const query = useQuery({
    queryFn: async () => {
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

  console.log(query.data);

  return (
    <>
      {!query.data.length ||
        (query.data.length === 0 && <Text>No posts found</Text>)}
      {query.data?.map(
        (
          post: Post & { creator: { profile: Profile }; tags: Tag[] },
          i: number
        ) => (
          <NewsArticle
            // @ts-expect-error TODO: Fix this
            creator={{
              profile: post.creator.profile,
            }}
            key={post.id}
            // @ts-expect-error TODO: Fix this
            tags={post.tags}
            {...post}
          />
        )
      )}
    </>
  );
}
