"use client";
import { useState } from "react";
import { TextInput, Button, FileInput, Stack, Container } from "@mantine/core";
import RichTextEditorComponent from "@/components/shared/rich-text-editor";
import { useRouter } from "next/navigation";
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

export default function CreatePost() {
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

  const submit = async (data: CreatePostFormSchema) => {
    try {
      router.push("/creator/my-posts");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Container size="md">
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
                      required
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
              name="cover_image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileInput
                      label="Cover Image"
                      accept="image/*"
                      required
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
                    <FileInput
                      label="Additional Images"
                      accept="image/*"
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

            <Button type="submit">Create Post</Button>
          </Stack>
        </form>
      </Form>
    </Container>
  );
}
