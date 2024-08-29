"use client";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import NewsPostCarousel from "../news-post-carousel";

export default function Hero() {
  return (
    <Container size="md">
      <div className={cn("flex")}>
        <div className={cn("")}>
          <Title className={cn("")}>
            A <span className={cn("")}>modern</span> React <br /> components
            library
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <Check
                  style={{ width: rem(12), height: rem(12), stroke: "1.5" }}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all
              components and hooks export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when
              user navigates with keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={cn("")}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={cn("")}>
              Source code
            </Button>
          </Group>
        </div>
        <div>
          <NewsPostCarousel />
        </div>
      </div>
    </Container>
  );
}
