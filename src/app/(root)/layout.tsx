import React, { PropsWithChildren } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
