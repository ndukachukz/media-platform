"use client";
import { useBreadCrumbsStore } from "@/app/providers";
import { NewsArticle } from "@/components/shared/news-article";
import { cn } from "@/lib/utils";
import {
  Box,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Title,
  Image,
} from "@mantine/core";
import { Post, Tag, Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import classes from "@/app/not-found.module.css";

export default function PostsPage() {
  const add = useBreadCrumbsStore((store) => store.add);

  useEffect(() => {
    add("Posts");
  }, []);

  const { data, isPending, isError } = useQuery({
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

  if (isError || !data?.posts || data.posts.length === 0) {
    return (
      <Container className={cn(classes.root, " ")}>
        <SimpleGrid
          spacing={{ base: 40, sm: 80 }}
          cols={{ base: 1, sm: 2 }}
          className={cn("p-5 border mx-auto rounded")}
        >
          <Image
            src={
              "https://res.cloudinary.com/dj753bxhx/image/upload/v1725548115/e4bsusx0j6v2jup5ouey.svg"
            }
            alt="posts not found"
            className={classes.mobileImage}
          />
          <div>
            <Title className={classes.title}>No posts found...</Title>
            <Text c="dimmed" size="lg">
              There are no posts.
            </Text>
            {/* TODO: goto create posts if user is an admin or creator <Link href={"/"}>
              <Button
                variant="outline"
                size="md"
                mt="xl"
                className={classes.control}
              >
                Get back to home page
              </Button>
            </Link> */}
          </div>
          <Image
            src={
              "https://res.cloudinary.com/dj753bxhx/image/upload/v1725548115/e4bsusx0j6v2jup5ouey.svg"
            }
            alt="posts not found"
            className={classes.desktopImage}
          />
        </SimpleGrid>
      </Container>
    );
  }

  console.log("posts => ", data?.posts);
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brand", type: "bars" }}
      />
      {data?.posts?.map(
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
    </Box>
  );
}
