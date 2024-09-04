import React from "react";

import { Metadata } from "next";
import Image from "next/image";
import PostImageCarousel from "@/components/shared/post-image-carousel";
import { CreatePostFormSchema } from "@/lib/validations/post.schemas";

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const response = await fetch(`/api/posts/${params.slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const post = await response.json();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8 relative w-full h-[400px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <PostImageCarousel
        images={post.images as CreatePostFormSchema["images"]}
      />
    </article>
  );
}
