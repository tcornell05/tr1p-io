import HeroPost from "@/components/post-components/hero-post";
import PostsContainer from "@/components/posts-container";
import { Card, CardBody } from "@nextui-org/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence } from "framer-motion";
import { getSortedPostsData } from "@/app/utils/posts";
export default function Home() {

  const posts = getSortedPostsData(); // Call the getSortedPostsData function to retrieve the sorted posts data.
  //write file name without file extension into hero post id for select hero post
  return (
    <>
      <Card className="bg-gray-800 flex  rounded-none">
        <Card className="bg-gray-800  flex-row justify-center rounded-none">
          <CardBody>
            <section className="w-full">
              <PostsContainer posts={posts} />
            </section>
          </CardBody>
        </Card>
      </Card>
    </>
  );
}
