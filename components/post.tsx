'use client'
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import getFormattedDate from "@/app/utils/getFormattedDate";
import { getSortedPostsData, getPostData } from "@/app/utils/posts";
import { notFound } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from 'next/image';
import { Vortex } from '@/components/ui/vortex';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { TracingBeam } from '@/components/ui/tracing-beam';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export const RenderPost = ({ BlogPost }) => {
  const { title, date, contentHtml, author, image, keywords } = BlogPost;
  const router = useRouter();
  const pubDate = getFormattedDate(date);

  return (
    <div className="flex justify-center w-full bg-gray-900 text-gray-200">
      <Vortex backgroundColor="#18181b00" rangeY={10000} className="" />
      <div className="flex flex-col items-center w-full lg:flex-row lg:mx-auto lg:max-w-lp-container lg:px-2">
        <main className="group/main peer/main flex flex-col items-center flex-auto mb-12 ml-0 mt-4 w-full max-w-full lg:mb-18 lg:mt-6 min-w-0 lg:pl-28 lg:pr-32">
          <div className="absolute top-6 right-14 flex space-x-2 items-center z-10">
            <button
              onClick={() => router.push('/posts')}
              className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
            >
              <FaArrowLeft />
            </button>
            <a
              href="/"
              className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
            >
              <FaHome />
            </a>
          </div>
          <article className="relative w-full p-0">
            <TracingBeam className="sm:px-0 lg:px-12">
              <Card isFooterBlurred className="h-[450px] rounded-none bg-gray-800">
                {image && (
                  <Image src={image} alt={title} className="z-0 w-full h-full object-cover" layout="fill" />
                )}
                <CardBody></CardBody>
                <CardFooter className="bg-tr1p flex justify-center items-center w-full rounded-none">
                  <h4 className="text-white font-large text-2xl text-center">{title}</h4>
                </CardFooter>
              </Card>
              <div className="mt-6">
                <div className="flex flex-row justify-center font-bold gap-1 items-center mt-10 mb-4 text-xs">
                  <span className="no-underline text-inherit">{author}</span>
                  {" - "}
                  <span className="no-underline text-inherit">{pubDate} </span>
                </div>
                <Card className="bg-gray-900 text-center lg:px-5 py-3 text-[11px] lg:text-xs leading-[18px] text-gray-200 mx-auto mt-4 mb-4 rounded-none">
                  <p>This is an opinion piece.</p>
                </Card>
                <BackgroundGradient className="bg-white dark:bg-gray-800 md:p-6 sm:p-4 xs:p-4">
                  <AnimatePresence>
                    <div className="h-full w-full absolute inset-0">
                      <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-gray-800"
                        colors={[
                          [236, 72, 153],
                          [232, 121, 249],
                        ]}
                        dotSize={2}
                      />
                    </div>
                  </AnimatePresence>
                  <Card className="bg-gray-800 mx-auto p-6 rounded-none">
                    <article
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                      className="prose lg:prose-lg max-w-none prose-invert rounded-none"
                    />
                    {keywords && keywords.length > 0 && (
                      <div className="flex flex-wrap mt-4 justify-center select-none">
                        {keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-blue-200 text-blue-900 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </BackgroundGradient>
              </div>
            </TracingBeam>
          </article>
        </main>
      </div>
    </div>
  );
};
