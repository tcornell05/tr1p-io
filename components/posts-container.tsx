
'use client'
import { getSortedPostsData } from "@/app/utils/posts";
import RenderPosts from "./post-components/render-posts"; // Import the RenderPosts component from a relative path.
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card } from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
export default function PostsContainer({ posts }) {
  const router = useRouter();
  return (

    <Card className="rounded-none">
      <BackgroundGradient >
        <div className="absolute top-3 right-10 flex space-x-2 items-center z-10">

          <a
            href="/"
            className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
          >
            <FaHome />
          </a>
        </div>
        < section className="flex justify-center  w-full min-h-screen " >

          <div className="grid grid-cols-1 h-full w-[61rem]">
            {/* Render the RenderPosts component and pass the 'posts' data as a prop. */}
            <RenderPosts posts={posts} />
          </div>
        </section >
      </BackgroundGradient >
    </Card>
  );
}
