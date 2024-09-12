"use client";
import React from "react";

import PostImageCarousel from "@/components/shared/post-image-carousel";
import { CreatePostFormSchema } from "@/lib/validations/post.schemas";
import usePost from "@/hooks/usePost";
import { Container, SimpleGrid, Text, Title, Image } from "@mantine/core";
import { cn } from "@/lib/utils";
import classes from "@/app/not-found.module.css";

interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const decodedUrl = decodeURIComponent(params.slug);

  const { data, isError } = usePost(decodedUrl);

  if (isError || !data?.post) {
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
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.post.title}</h1>
      <div className="mb-8 relative w-full h-[400px]">
        <Image
          src={data.post.cover_image ?? ""}
          alt={data.post.title}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: data.post.content as string }}
      />
      <PostImageCarousel
        images={data.post.images as CreatePostFormSchema["images"]}
      />
    </article>
  );
}
