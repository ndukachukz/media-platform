"use client";
import { Tabs, rem } from "@mantine/core";
import { INewsArticle, NewsArticle } from "./news-article";
import { Button } from "../ui/button";

function LatestStories() {
  const articles: INewsArticle[] = [
    {
      id: 1,
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      image: "/api/placeholder/600/400",
      category: "World",
      author: { id: 1, name: "John Doe", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T10:00:00"),
    },
    {
      id: 2,
      title: "Tech Update",
      content: "Consectetur adipiscing elit",
      image: "/api/placeholder/600/400",
      category: "Technology",
      author: { id: 2, name: "Jane Smith", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T11:30:00"),
    },
    {
      id: 3,
      title: "Sports Highlights",
      content: "Sed do eiusmod tempor incididunt",
      image: "/api/placeholder/600/400",
      category: "Sports",
      author: { id: 3, name: "Mike Johnson", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T09:15:00"),
    },
    {
      id: 4,
      title: "Entertainment Buzz",
      content: "Ut labore et dolore magna aliqua",
      image: "/api/placeholder/600/400",
      category: "Entertainment",
      author: { id: 4, name: "Emily Brown", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T14:45:00"),
    },
    {
      id: 5,
      title: "Science Discovery",
      content: "Ut enim ad minim veniam",
      image: "/api/placeholder/600/400",
      category: "Science",
      author: { id: 5, name: "Alex Green", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T16:20:00"),
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
