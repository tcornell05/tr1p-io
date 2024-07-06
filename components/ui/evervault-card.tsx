"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {Spinner} from "@nextui-org/react";

export const EvervaultCard = ({
                                  text,
                                  className,
                              }: {
    text?: string;
    className?: string;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        let str = generateRandomString(1500);
        setRandomString(str);

        // Function to update mouseX and mouseY
        const updateMousePosition = () => {
            mouseX.set(Math.random() * window.innerWidth);
            mouseY.set(Math.random() * window.innerHeight);
        };

        // Interval to periodically update mouse position
        const intervalId = setInterval(() => {
            updateMousePosition();

            // Optionally regenerate the random string to keep the animation dynamic
            setRandomString(generateRandomString(1500));
        }, 60); // Update every second, adjust as needed

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Removed onMouseMove event handler as it's no longer needed

    return (
        <div
            className={cn(
                "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
                className
            )}
        >
            <div
                className="rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
            >
                <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />
                <div className="relative z-10 flex items-center justify-center">
                    <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-4xl">

                        <div className="absolute w-1/2 h-1/2 bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full"></div>
                        <Spinner color="danger" size={`lg`}/>
                        <span className="dark:text-white text-black z-20">{text}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
    let maskImage = useMotionTemplate`radial-gradient(0px at ${mouseX}px ${mouseY}px, transparent 100%, black)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    // Adjusted classes for continuous visibility of the animation effects
    return (
        <div className="pointer-events-none absolute inset-0">
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 backdrop-blur-xl"
                style={style}
            />
            <motion.div
                className="absolute inset-0 rounded-2xl mix-blend-overlay"
                style={style}
            >
                <p className="absolute inset-x-0 top-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold">
                    {randomString}
                </p>
            </motion.div>
        </div>
    );
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};