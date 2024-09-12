"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INewsArticle } from "./news-article";
import EditorsPick from "./editors-pick-article/editors-pick";
import usePosts from "@/hooks/usePosts";

function EditorsPickCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const { data, isError } = usePosts();

  if (isError || !data?.posts) return <div>Error fetching posts</div>;

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
          <EditorsPick
            article={data.posts[Math.abs(page) % data.posts.length]}
          />
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
