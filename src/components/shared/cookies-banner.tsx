"use client";
import React, { useEffect } from "react";
import {
  Button,
  Paper,
  Text,
  Group,
  CloseButton,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion, AnimatePresence } from "framer-motion";

export function CookiesBanner() {
  const [opened, { close }] = useDisclosure(true);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === "true") {
      close();
    }
  }, [close]);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    close();
  };

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-0 right-0 z-50"
        >
          <Container>
            <Paper withBorder p="lg" radius="md" shadow="md">
              <Group justify="space-between" mb="xs">
                <Text fz="md" fw={500}>
                  Allow cookies
                </Text>
                <CloseButton mr={-9} mt={-9} onClick={close} />
              </Group>
              <Text c="dimmed" fz="xs">
                So the deal is, we want to spy on you. We would like to know
                what did you have for today&rsquo;s breakfast, where do you
                live, how much do you earn and like 50 other things. To view our
                landing page you will have to accept all cookies. That&rsquo;s
                all, and remember that we are watching...
              </Text>
              <Group justify="flex-end" mt="md">
                <Button variant="default" size="xs">
                  Cookies preferences
                </Button>
                <Button variant="outline" size="xs" onClick={handleAccept}>
                  Accept all
                </Button>
              </Group>
            </Paper>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
