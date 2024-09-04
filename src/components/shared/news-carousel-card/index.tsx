import React from "react";
import { Image, Text, Group, Button, rem } from "@mantine/core";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent, Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

export default function NewsCardCarousel() {
  const slides = images.map((image, index) => (
    <CarouselItem key={image} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card>
          <CardContent className="px-0 py-0">
            <Image src={image} alt="news image" className="size-full" />
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ));

  return (
    <Card className="rounded-md px-5 py-5">
      <Card>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>{slides}</CarouselContent>
          <CarouselPrevious className="-left-5" />
          <CarouselNext className="max-sm:-right-5 md:-right-9 " />
        </Carousel>
      </Card>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">
          Forde, Norway
        </Text>

        <Group gap={5}>
          <Star style={{ width: rem(16), height: rem(16) }} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm">
        Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel
        close to nature in ultimate comfort. Enjoy the view of the epic mountain
        range of Blegja and the Førdefjord.
      </Text>

      <Group justify="space-between" mt="md">
        <Button radius="md">Read now</Button>
      </Group>
    </Card>
  );
}
