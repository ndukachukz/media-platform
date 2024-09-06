"use client";
import { Card as MNCard, Text } from "@mantine/core";
import classes from "./account-type-card.module.css";
import { Dispatch, SetStateAction } from "react";
import { ProfileCreateSchema } from "@/types/user.type";
import { cn } from "@/lib/utils";

export default function AccountTypeCard({
  onSelect,
  image,
  title,
  id,
}: {
  id: ProfileCreateSchema["role"];
  onSelect: Dispatch<SetStateAction<ProfileCreateSchema["role"]>>;
  image: string;
  title: string;
}) {
  return (
    <MNCard
      onClick={() => {
        onSelect(id);
      }}
      p="lg"
      shadow="lg"
      className={cn(classes.card, "w-full")}
      radius="md"
      component="button"
      type="button"
    >
      <div
        className={cn(classes.image, "w-full")}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className={cn(classes.overlay, "w-full")} />

      <div className={cn(classes.content)}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {title}
          </Text>
        </div>
      </div>
    </MNCard>
  );
}
