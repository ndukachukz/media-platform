"use client";
import { useState } from "react";
import { Container, Anchor, Group, Burger, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Box as IconBox, Link } from "lucide-react";
import classes from "./header.module.css";
import Navbar from "@/components/shared/navbar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const userLinks = [
  { link: "#", label: "Privacy & Security" },
  { link: "#", label: "Account settings" },
  { link: "#", label: "Support options" },
];

const mainLinks = [
  { link: "#", label: "Book a demo" },
  { link: "#", label: "Documentation" },
  { link: "#", label: "Community" },
  { link: "#", label: "Academy" },
  { link: "#", label: "Forums" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<"a">
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <header className={cn(classes.header, pathname !== "/" && "hidden")}>
      <Container className={classes.inner}>
        <Link href="/">
          <IconBox size={34} />
        </Link>
        <Box className={classes.links} visibleFrom="sm">
          <Group justify="flex-end">{secondaryItems}</Group>
          <Group gap={0} justify="flex-end" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </Box>
        <Navbar />
      </Container>
    </header>
  );
}
