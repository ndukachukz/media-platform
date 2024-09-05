"use client";
import React, {
  PropsWithChildren,
  type ReactNode,
  createContext,
  useRef,
  useContext,
} from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "zustand";
import {
  type BreadCrumbsStore,
  createBreadCrumbsStore,
} from "@/stores/breadcrums-store";

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

export type BreadCrumbsStoreApi = ReturnType<typeof createBreadCrumbsStore>;

export const BreadCrumbsStoreContext = createContext<
  BreadCrumbsStoreApi | undefined
>(undefined);

export interface BreadCrumbsStoreProviderProps {
  children: ReactNode;
}

export const BreadCrumbsStoreProvider = ({
  children,
}: BreadCrumbsStoreProviderProps) => {
  const storeRef = useRef<BreadCrumbsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createBreadCrumbsStore();
  }

  return (
    <BreadCrumbsStoreContext.Provider value={storeRef.current}>
      {children}
    </BreadCrumbsStoreContext.Provider>
  );
};

export const useBreadCrumbsStore = <T,>(
  selector: (store: BreadCrumbsStore) => T
): T => {
  const breadCrumbsContext = useContext(BreadCrumbsStoreContext);

  if (!breadCrumbsContext) {
    throw new Error(`useBreadCrumbs must be used within BreadCrumbsProvider`);
  }

  return useStore(breadCrumbsContext, selector);
};

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
            <BreadCrumbsStoreProvider>
              {props.children}
            </BreadCrumbsStoreProvider>
          </QueryClientProvider>
        </TooltipProvider>
      </MantineProvider>
    </ClerkProvider>
  );
}
