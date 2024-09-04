"use client";
import {
  Card as MNCard,
  rem,
  Stepper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import classes from "./account-type-card.module.css";
import { UserRoles } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";

export default function AccountTypeCard({
  onSelect,
  image,
  title,
  id,
}: {
  id: "Admin" | "User";
  onSelect: Dispatch<SetStateAction<"User" | "Admin">>;
  image: string;
  title: string;
}) {
  const theme = useMantineTheme();
  console.log(image);

  return (
    <MNCard
      onClick={() => {
        onSelect(id);
      }}
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="button"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {title}
          </Text>
        </div>
      </div>
    </MNCard>
  );
}
