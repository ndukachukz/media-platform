"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INewsArticle } from "./news-article";
import EditorsPick from "./editors-pick-article/editors-pick";

function EditorsPickCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const articles: INewsArticle[] = [
    {
      id: 1,
      title: "Breaking News",
      content: "Lorem ipsum dolor sit amet",
      image: "/api/placeholder/600/400",
      category: "World",
      author: { id: 1, name: "John Doe", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T10:00:00"),
    },
    {
      id: 2,
      title: "Tech Update",
      content: "Consectetur adipiscing elit",
      image: "/api/placeholder/600/400",
      category: "Technology",
      author: { id: 2, name: "Jane Smith", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T11:30:00"),
    },
    {
      id: 3,
      title: "Sports Highlights",
      content: "Sed do eiusmod tempor incididunt",
      image: "/api/placeholder/600/400",
      category: "Sports",
      author: { id: 3, name: "Mike Johnson", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T09:15:00"),
    },
    {
      id: 4,
      title: "Entertainment Buzz",
      content: "Ut labore et dolore magna aliqua",
      image: "/api/placeholder/600/400",
      category: "Entertainment",
      author: { id: 4, name: "Emily Brown", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T14:45:00"),
    },
    {
      id: 5,
      title: "Science Discovery",
      content: "Ut enim ad minim veniam",
      image: "/api/placeholder/600/400",
      category: "Science",
      author: { id: 5, name: "Alex Green", avatar: "/api/placeholder/40/40" },
      created_at: new Date("2024-08-29T16:20:00"),
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={{
            enter: (direction) => ({
              x: direction > 0 ? 1000 : -1000,
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction) => ({
              zIndex: 0,
              x: direction < 0 ? 1000 : -1000,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <EditorsPick {...articles[Math.abs(page) % articles.length]} />
        </motion.div>
      </AnimatePresence>
      <div className="flex my-3">
        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
          onClick={() => paginate(-1)}
          variant="subtle"
          color="gray"
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          onClick={() => paginate(1)}
          variant="subtle"
          color="gray"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
}

export default EditorsPickCarousel;
