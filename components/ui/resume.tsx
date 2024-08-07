'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { useRouter } from 'next/navigation';
import { Vortex } from '@/components/ui/vortex';
import remarkGfm from 'remark-gfm';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

interface ResumeProps {
  markdownContent: string;
}

const Resume: React.FC<ResumeProps> = ({ markdownContent }) => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Vortex backgroundColor="#18181b00" rangeY={10000} particleCount={100} className="" />

      <div className="flex justify-center p-4 md:p-8">
        <div className="w-full lg:w-1/2 flex-row mx-auto">
          <div className="p-[2px] shadow-lg">
            <Card className="bg-white dark:bg-gray-100 text-black dark:text-gray-100 border-none rounded-none relative">
              <CardHeader>
                <div className="absolute top-2 right-2 flex space-x-2 items-center">
                  <a
                    href="/"
                    className="text-xl p-2 rounded-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white transition"
                  >
                    <FaArrowLeft />
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition text-gray-900 dark:text-white"
                  >
                    <FaDownload />
                  </a>
                </div>
              </CardHeader>
              <CardBody className="p-4 md:p-10 prose prose-sm sm:prose md:prose-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
