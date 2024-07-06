'use client'
import React from "react";
import { Image, Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from "@nextui-org/react";
import { DM_Mono } from 'next/font/google';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FlipWords } from "@/components/ui/flip-words";
import clsx from "clsx";
import { WavyBackground } from '@/components/ui/wavy-background';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Vortex } from "@/components/ui/vortex";

const FONT_DM_MONO = DM_Mono({ weight: "300", preload: false });

function SpotlightHome() {
  return (
    <div className="h-[50rem] w-full relative flex items-center justify-center overflow-hidden">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          AI Shenanigans
        </h1>
        <TypewriterEffectSmooth>
          Welcome to Shenanigans.AI, The webs best text-prompt to AI Image generation Utility and Gallery. Save time by painting with your words.
        </TypewriterEffectSmooth>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default function Home() {
  const words = ["software engineer", "developer", "full stack developer", "nerd"];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={`lg`}
        backdrop={"blur"}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className={`font-sans`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="flex flex-row justify-center">
                <Image
                  src="img/macer.png"
                  alt="Selected Image"
                  className="object-cover"
                  style={{ width: '100%' }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className={clsx("w-full dark:bg-gray-800 bg-white relative overflow-hidden")}>
        <WavyBackground backgroundFill="rgb(17 24 39 / 92%)" className="">
          <Vortex backgroundColor="#18181b00" rangeY={10000} particleCount={20} className="" />
          <div className="flex p-8 mt-10">
            <div className="lg:basis-3/5 flex-row mx-auto">
              <BackgroundGradient className="p-[8px] ">
                <Card className={`${FONT_DM_MONO.className} bg-gray-800 rounded-none`}>
                  <CardHeader>
                    <div className="flex flex-col">
                      <TypewriterEffectSmooth>Welcome to... tr1p.io</TypewriterEffectSmooth>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <span>Thanks for stopping by my little corner of the internet. At the ripe age of 32 I've devoted my professional career as a <FlipWords words={words} /></span>
                    <p>. I have a general love for all things computer science that started merely as a fascination and deep admiration with how a computer even works. Which led to a general knack of picking things apart and creating end-to-end systems of all sizes. I've been professionally coding since 2013, particularly in the ad-tech industry. I'm a lover of games, music, science, and space. My love for learning seems to grow with age. I'm devoted to spending the next decades of my life <em>creating things.</em>
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <div className="flex flex-col md:flex-row md:justify-between w-full">
                      <div className="grid grid-cols-2 gap-4 mb-4 md:mb-0 md:flex md:flex-wrap md:gap-4 md:items-center md:w-auto">
                        <a
                          href="https://github.com/tcornell05"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transform hover:-translate-y-1 transition duration-400"
                        >
                          <Button color="primary">GitHub</Button>
                        </a>
                        <Link href="/resume" className="transform hover:-translate-y-1 transition duration-400">
                          <Button color="secondary">Resume</Button>
                        </Link>
                        <Link href="/posts" className="transform hover:-translate-y-1 transition duration-400">
                          <Button color="success">Blog</Button>
                        </Link>
                        <Button
                          className="transform hover:-translate-y-1 transition duration-400"
                          color="warning"
                          onClick={() => {
                            onOpen();
                          }}
                        >
                          My Dog
                        </Button>
                      </div>
                      <Link href="/generate" className="md:ml-auto w-full md:w-auto shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 h-full md:h-auto">
                        <Button>Image Gen</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </BackgroundGradient>
            </div>
          </div>
        </WavyBackground>
      </div>
    </>
  );
}
