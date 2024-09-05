"use client";
import { Tabs, rem } from "@mantine/core";
import { NewsArticle, INewsArticle } from "./news-article";
import { Button } from "../ui/button";

function LatestStories() {
  const articles: INewsArticle[] = [
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
    {
      id: "1",
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      images: ["/api/placeholder/600/400"],
      tags: [{ id: "", name: "World" }],
      creator: {
        profile: {
          id: "1",
          first_name: "John",
          image: "/api/placeholder/40/40",
          last_name: "doe",
        },
      },
      created_at: new Date("2024-08-29T14:45:00"),
      slug: "",
      cover_image: null,
      creator_id: "",
    },
  ];

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NewsArticle {...articles[0]} className="md:col-span-2 md:row-span-2" />
        <NewsArticle {...articles[1]} />
        <NewsArticle {...articles[2]} />
        <NewsArticle {...articles[3]} className="md:col-span-2" />
        <NewsArticle {...articles[4]} />
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
