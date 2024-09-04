"use client";
// PostCarousel.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreatePostFormSchema } from "@/lib/validations/post.schemas";

const images = [
  "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1588572878342-88c7b953e9a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
];

export default function PostImageCarousel({
  images,
}: {
  images: CreatePostFormSchema["images"];
}) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((current + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-80 mt-4">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt="Post Image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="object-cover w-full h-full"
        />
      </AnimatePresence>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={handlePrev} className="p-2 bg-white shadow-md">
          Prev
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={handleNext} className="p-2 bg-white shadow-md">
          Next
        </button>
      </div>
    </div>
  );
}
