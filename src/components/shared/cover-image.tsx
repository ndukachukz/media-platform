import React from "react";
import Image from "next/image";

export default function CoverImage() {
  return (
    <div className="relative w-full h-60 md:h-96">
      <Image
        src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
        alt="post cover imaage"
        className="object-cover w-full h-full"
      />
    </div>
  );
}
