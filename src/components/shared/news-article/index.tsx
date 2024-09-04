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

export interface Author {
  id: number;
  name: string;
  avatar: string;
}

export interface INewsArticle {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  created_at: Date;
}

export interface Props extends INewsArticle {
  className?: string;
}

export function NewsArticle({ className, ...article }: Props) {
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };

  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src="" alt={article.image} height={180} />
        </a>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "brand", to: "red" }}
      >
        {article.category}
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {article.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {article.content}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar src={article.author.avatar} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {article.author.name}
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
