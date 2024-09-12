import { Card, Image, Avatar, Text, Group } from "@mantine/core";
import { INewsArticle, ArticleTags } from "@/components/shared/news-article";
import classes from "./editors-pick-article.module.css";
import { cn } from "@/lib/utils";

export default function EditorsPick({ className, article }: INewsArticle) {
  console.log("Article => ", article);

  return (
    <Card withBorder radius="md" p={0} className={cn(classes.card, className)}>
      <Group wrap="nowrap" gap={0}>
        <Image src={article.images[0]} alt="editors pick" height={160} />
        <div className={classes.body}>
          <ArticleTags tags={article.tags} />
          <Text className={classes.title} mt="xs" mb="md">
            {article.title}
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar size={20} src={article.creator.profile.image} />
              <Text size="xs">
                {article.creator.profile.first_name +
                  article.creator.profile.last_name}
              </Text>
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
