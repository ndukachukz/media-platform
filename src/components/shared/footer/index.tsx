"use client";
import { cn } from "@/lib/utils";
import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import { Instagram, Youtube, Twitter, Box } from "lucide-react";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={cn("")}>
      <div className={cn("flex justify-around py-5")}>
        <Box size={28} />

        <Group className={cn("")}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <Twitter
              style={{ width: rem(18), height: rem(18), stroke: "1.5" }}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <Youtube
              style={{ width: rem(18), height: rem(18), stroke: "1.5" }}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <Instagram
              style={{ width: rem(18), height: rem(18), stroke: "1.5" }}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
