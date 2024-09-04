import { Post } from "@prisma/client";
import { z } from "zod";

const postTagSchema = z.object({
  name: z.string(),
});
export const createPostFormSchema = z.object({
  content: z.string(),
  title: z.string(),
  cover_image: z.string().url(),
  images: z.array(z.string().url()),
  published: z.boolean().default(false),
  tags: z.array(postTagSchema),
});

export type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;
export type PostTagSchema = z.infer<typeof postTagSchema>;
