"use client";
import React, { PropsWithChildren } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export default function AppProvider(props: PropsWithChildren) {
  return (
    <React.Fragment>
      <MantineProvider>{props.children}</MantineProvider>
    </React.Fragment>
  );
}
