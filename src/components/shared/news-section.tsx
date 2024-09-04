import { Container, Flex, Text, Title } from "@mantine/core";
import NewsFeedGrid from "./news-feed-grid";
import Sidebar from "./sidebar";
import EditorsPickCarousel from "./editors-pick-carousel";

export default function NewsFeed() {
  return (
    <Container>
      <Flex my="md">
        <NewsFeedGrid />
        <Sidebar />
      </Flex>

      <div className="space-y-3">
        <Title>Editors Pick</Title>
        <EditorsPickCarousel />
      </div>
    </Container>
  );
}
