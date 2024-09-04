"use client";
import { Container, Title, Text } from "@mantine/core";
import { cn } from "@/lib/utils";
import NewsPostCarousel from "../news-post-carousel";
import { BookMarked, Share, Heart } from "lucide-react";

export default function Hero() {
  return (
    <Container size="md">
      <div className={cn("md:flex gap-x-5 justify-between ")}>
        <div className={cn("")}>
          <div className={cn("flex justify-between")}>
            <Text
              size="sm"
              fw={600}
              variant="gradient"
              gradient={{ from: "brand", to: "cyan", deg: 90 }}
              className="capitalize"
            >
              trending
            </Text>

            <div className={cn("flex gap-5")}>
              <Heart size={18} className="text-red-500" />
              <Share size={18} className="text-blue-500" />
              <BookMarked size={18} className="text-gray-500" />
            </div>
          </div>

          <Title order={2} textWrap="wrap" className={cn("")}>
            Cake meme reflects coronavirus absurdity in a world where nothing is
            what it seems
          </Title>
          <Text mt="md">
            Earlier this month, a viral video depicting hyper-realistic cakes as
            everyday items had folks on social media double-guessing every other
            post, and sometimes even their own realities, effectively launching
            the next meme : “Is this real or is this cake?”
          </Text>

          <div className="flex gap-10 mt-3">
            <Text>2 hours ago</Text>
            <Text c="dimmed">By Lucy Hiddleston | 4min read</Text>
          </div>
        </div>
        <NewsPostCarousel />
      </div>
    </Container>
  );
}
