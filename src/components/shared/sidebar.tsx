"use client";
import { Card, Image, Text, TextInput, List } from "@mantine/core";
import { Search } from "lucide-react";

const Sidebar = () => (
  <div className="hidden md:block space-y-6">
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700} size="lg" mb="md">
        Search
      </Text>
      <TextInput
        placeholder="Search articles..."
        leftSection={<Search size={14} />}
      />
    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700} size="lg" mb="md">
        Categories
      </Text>
      <List spacing="xs" size="sm" center>
        <List.Item>World</List.Item>
        <List.Item>Technology</List.Item>
        <List.Item>Sports</List.Item>
        <List.Item>Entertainment</List.Item>
        <List.Item>Science</List.Item>
      </List>
    </Card>

    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700} size="lg" mb="md">
        Featured Article
      </Text>
      <Image
        src="/api/placeholder/300/200"
        height={120}
        alt="Featured Article"
        mb="xs"
      />
      <Text fw={500} size="md">
        Breaking News: Important Event
      </Text>
      <Text size="sm" color="dimmed" mt="xs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </Text>
    </Card>
  </div>
);

export default Sidebar;
