"use client";
import { Bookmark, Heart, Share } from "lucide-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core";
import classes from "./news-article.module.css";
import { Post, Profile, Tag } from "@prisma/client";
import Link from "next/link";

export interface Author {
  id: number;
  name: string;
  avatar: string;
}

export interface INewsArticle
  extends Pick<
    Post,
    | "content"
    | "title"
    | "slug"
    | "created_at"
    | "cover_image"
    | "id"
    | "creator_id"
    | "images"
  > {
  className?: string;
  tags: Tag[];
  creator: {
    profile: Pick<Profile, "image" | "first_name" | "last_name" | "id">;
  };
}

export function ArticleTags(tags: INewsArticle["tags"]) {
  return (
    <>
      {tags &&
        tags.map((tag: Tag) => (
          <Badge
            key={tag.id}
            className={classes.rating}
            variant="gradient"
            gradient={{ from: "brand", to: "red" }}
          >
            {tag.name}
          </Badge>
        ))}
    </>
  );
}

export function NewsArticle({ className, ...article }: INewsArticle) {
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link href={`/posts/${article.slug}`}>
          <Image src={article.cover_image} alt={article.slug} height={180} />
        </Link>
      </Card.Section>

      <ArticleTags {...article.tags} />

      <Text
        className={classes.title}
        fw={500}
        component="a"
        href={article.slug}
      >
        {article.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {article.content}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src={article.creator.profile.image}
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            {article.creator.profile.first_name +
              article.creator.profile.last_name}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <Heart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <Bookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <Share
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
