import React from "react";

import { Metadata } from "next";
import Image from "next/image";
// import PostImageCarousel from "@/"

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const postData = await getPostData(params.slug);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
      <div className="mb-8 relative w-full h-[400px]">
        <Image
          src={postData.coverImage}
          alt={postData.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
      {/* <PostImageCarousel images={postData.images} /> */}
    </article>
  );
}
