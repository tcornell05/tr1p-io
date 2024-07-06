"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterEffectSmoothProps {
  children: React.ReactNode;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffectSmooth: React.FC<TypewriterEffectSmoothProps> = ({
  children,
  className,
  cursorClassName,
}) => {
  // State to manage the animation progress
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (typeof children === "string") {
      // Set up the animation to gradually reveal the text
      const interval = setInterval(() => {
        setAnimationProgress((currentProgress) => {
          if (currentProgress < children.length) {
            return currentProgress + 1;
          } else {
            clearInterval(interval);
            return currentProgress;
          }
        });
      }, 50); // Adjust the speed as necessary

      return () => clearInterval(interval);
    } else {
      console.error("TypewriterEffectSmooth expects children to be a string.");
    }
  }, [children]);

  if (typeof children !== "string") {
    return null;
  }

  return (
    <div className={cn("my-6", className)}>
      <div
        className="relative overflow-hidden"
        style={{
          maxWidth: "fit-content",
        }}
      >
        <span className="" aria-hidden="true">
          {children.substring(0, animationProgress)}
        </span>
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inline-block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
            cursorClassName
          )}
          style={{
            right: 0,
          }}
        ></motion.span>
      </div>
      {/* Visually hidden text for SEO */}
      <div className="sr-only">{children}</div>
    </div>
  );
};
