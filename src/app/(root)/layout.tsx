import React, { PropsWithChildren } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { CookiesBanner } from "@/components/shared/cookies-banner";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <CookiesBanner />
      <Footer />
    </>
  );
}

export default RootLayout;
