import "reflect-metadata";
import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import AppProvider from "./providers";

import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nairametrics Media Platform",
  description: "By creators for readers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",

          poppins.variable,
          montserrat.variable
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
