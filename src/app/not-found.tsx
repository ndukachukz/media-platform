import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";

import classes from "./not-found.module.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFoundImage() {
  return (
    <Container className={cn(classes.root, " ")}>
      <SimpleGrid
        spacing={{ base: 40, sm: 80 }}
        cols={{ base: 1, sm: 2 }}
        className={cn("p-5 border mx-auto rounded")}
      >
        <Image
          src={
            "https://res.cloudinary.com/dj753bxhx/image/upload/v1725043115/wcvofkjthxpbbvruwqji.svg"
          }
          alt="404 image"
          className={classes.mobileImage}
        />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Link href={"/"}>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image
          src={
            "https://res.cloudinary.com/dj753bxhx/image/upload/v1725043115/wcvofkjthxpbbvruwqji.svg"
          }
          alt="404 image"
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
