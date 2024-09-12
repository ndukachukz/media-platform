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
import usePosts from "@/hooks/usePosts";

export default function PostsPage() {
  const add = useBreadCrumbsStore((store) => store.add);

  useEffect(() => {
    add(["Posts"]);
  }, [add]);

  const { data, isPending, isError } = usePosts();

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

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brand", type: "bars" }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 p-2">
        {data?.posts?.map((post) => (
          <NewsArticle
            article={{
              ...post,
              creator: {
                profile: post.creator.profile,
              },
              tags: post.tags,
            }}
            key={post.id}
          />
        ))}
      </div>
    </Box>
  );
}
