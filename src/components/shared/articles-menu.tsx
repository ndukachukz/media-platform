"use client";
import { Tabs, rem } from "@mantine/core";
import { NewsArticle, INewsArticle } from "./news-article";
import { Button } from "../ui/button";
import usePosts from "@/hooks/usePosts";
import { useEffect } from "react";

function LatestStories() {
  const { data, isPending, isError } = usePosts();

  if (!data?.posts || isError) {
    return <div>No posts found...</div>; // Replace with your own loading component.
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.posts.map((post, i) => (
          <NewsArticle key={i} article={post} />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Button variant="outline">View More</Button>
      </div>
    </div>
  );
}

export default function ArticlesMenu() {
  return (
    <Tabs defaultValue="latest-stories">
      <Tabs.List>
        <Tabs.Tab value="latest-stories">Latest Stories</Tabs.Tab>
        <Tabs.Tab value="sports">Sports</Tabs.Tab>
        <Tabs.Tab value="healthcare">Health Care</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="latest-stories">
        <LatestStories />
      </Tabs.Panel>

      <Tabs.Panel value="sports">Sports</Tabs.Panel>
      <Tabs.Panel value="healthcare">Healt Care</Tabs.Panel>
    </Tabs>
  );
}
