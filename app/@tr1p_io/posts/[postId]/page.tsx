import React from 'react';
import { RenderPost } from '@/components/post';
import getFormattedDate from "@/app/utils/getFormattedDate";
import { getSortedPostsData, getPostData } from "@/app/utils/posts";
import { notFound } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
// Generate static page parameters
export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    postId: post.id,
  }));
}

// Generate page metadata
export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post does not exist.",
      keywords: [],
      author: "Unknown",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    author: post.author,
  };
}

// Main function to create the post page
export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;
  const page = posts.find((post) => post.id === postId);

  if (!page) notFound();

  const blogPost = await getPostData(postId);

  return (
    <RenderPost BlogPost={blogPost} />
  );
}
