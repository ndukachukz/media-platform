import { Card, Image, Avatar, Text, Group } from "@mantine/core";
import { Props as NewsArticleProps } from "@/components/shared/news-article";
import classes from "./editors-pick-article.module.css";
import { cn } from "@/lib/utils";

export default function EditorsPick({
  className,
  ...article
}: NewsArticleProps) {
  return (
    <Card withBorder radius="md" p={0} className={cn(classes.card, className)}>
      <Group wrap="nowrap" gap={0}>
        <Image src={article.image} alt="editors pick" height={160} />
        <div className={classes.body}>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {article.category}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {article.title}
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar size={20} src={article.author.avatar} />
              <Text size="xs">{article.author.name}</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              {article.created_at.toISOString()}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
