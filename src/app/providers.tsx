"use client";
import React, { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

export const queryClient = new QueryClient();

const theme = createTheme({
  colors: {
    brand: [
      "#faedff",
      "#edd9f7",
      "#d8b1ea",
      "#c286dd",
      "#ae62d2",
      "#a24bcb",
      "#9e3fc9",
      "#8931b2",
      "#7b2aa0",
      "#6b218d",
    ],
  },
  primaryColor: "brand",
});

export default function AppProvider(props: PropsWithChildren) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          fontFamily: "--font-montserrat",
          colorPrimary: "#a24bcb",
          colorText: "#6b218d",
          colorInputText: "#8931b2",
          colorInputBackground: "#faedff",
        },
      }}
      signUpUrl="/register"
      signInUrl="/login"
      signUpFallbackRedirectUrl={"/onboarding"}
      signInFallbackRedirectUrl={"/dashboard"}
    >
      <MantineProvider theme={theme}>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </TooltipProvider>
      </MantineProvider>
    </ClerkProvider>
  );
}
