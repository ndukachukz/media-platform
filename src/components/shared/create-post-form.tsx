"use client";
import { TextInput, Button, Stack, Container, TagsInput } from "@mantine/core";
import RichTextEditorComponent from "@/components/shared/rich-text-editor";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  createPostFormSchema,
  CreatePostFormSchema,
} from "@/lib/validations/post.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { auth } from "@clerk/nextjs/server";
import FileDropzone from "./file-dropzone";

export default function CreatePostForm() {
  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      cover_image: "",
      images: [],
    },
  });

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreatePostFormSchema) => {
      // Make API request to create post
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      return await response.json();
    },
    onSuccess: () => {
      redirect("/posts");
      // Handle success (e.g., show success message to user)
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      // Handle error (e.g., show error message to user)
      MutationObserver;
    },
  });

  const submit = async (data: CreatePostFormSchema) => {
    mutate(data);
  };

  return (
    <Container px={4}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack gap="md">
            <FormField
              name="slug"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <TextInput
                      label="slug"
                      onChange={(value) =>
                        field.onChange(value.target.value.replace(" ", "-"))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextInput label="Title" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagsInput
                      label="Press Enter to submit a tag"
                      placeholder="Enter tag"
                      defaultValue={["React, Tech", "Entertainment"]}
                      onChange={(vals) => field.onChange(vals)}
                      required
                      clearable
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cover_image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileDropzone
                      title="Cover Image"
                      multiple={false}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileDropzone
                      title="Additional Images"
                      multiple
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditorComponent content={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={isPending} disabled={isPending}>
              Create Post
            </Button>
          </Stack>
        </form>
      </Form>
    </Container>
  );
}
