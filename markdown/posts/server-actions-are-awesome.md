---
title: "Server Actions in Next.js are awesome, here is why you should use them"
date: "2024-07-04"
description: "Server actions in Next.js offer a more efficient approach to handling server-side logic directly within client-side code in an elegant way. Let's explore the benefits of using server-side actions by using my prompt image generation tool as a reference."
author: "tr1p"
image: "/img/mono-vs-serverless.webp"
keywords:
  - Next.js
  - Server Actions
---
## Benefits of Using Server Actions in Next.js for Image Generation
In recent years, the way we build web applications has evolved dramatically. One of the significant shifts has been the introduction of server actions in frameworks like Next.js, which offers developers a more efficient and streamlined approach to handling server-side logic directly within their client-side code. In this article, we will explore the benefits of using server actions for tasks such as image generation, comparing this approach to traditional methods.

### Traditional Approach: Client-Server Separation
Before diving into the new approach, let's briefly revisit the traditional method. Typically, web applications followed a strict separation between client-side and server-side logic. This involved:

- Client-Side Request: The client (browser) would send a request to the server, often through an API endpoint.
- Server-Side Processing: The server would handle the request, perform necessary operations (e.g., generating an image), and send the response back to the client.
- Client-Side Handling: The client would then handle the response, updating the UI accordingly.

While this approach is straightforward, it comes with *several challenges:*

- Increased Complexity: Developers need to maintain separate client-side and server-side codebases, often leading to duplicated logic and increased maintenance overhead.
- Latency: Every interaction involves a round-trip to the server, introducing latency and potentially impacting user experience.
- State Management: Managing state between client and server can become cumbersome, especially in complex applications.


### The New Approach: Server Actions in Next.js
Next.js, a popular React framework, has introduced server actions, allowing developers to define server-side logic within their client-side components. This paradigm shift offers several benefits:

**Simplified Codebase:** By colocating server actions with client components, developers can maintain a more unified codebase. This reduces the need for separate API routes and simplifies code management.

**Reduced Latency:** Server actions can be executed directly on the server during the rendering process, eliminating the need for additional round-trips. This leads to faster response times and a smoother user experience.

**Seamless State Management:** Since server actions are integrated into the client components, managing state becomes more straightforward. Developers can easily handle server responses and update the UI within the same component.

**Enhanced Security:** Server actions can leverage server-side authentication and authorization mechanisms, ensuring that sensitive operations (like image generation) are securely handled without exposing them to the client.

**Case Study**:  Prompt AI Image Generation on tr1p.io (**handleImageGeneration()**):
Let's consider a practical example to illustrate these benefits. Below is a snippet from a Next.js application that uses server actions to generate images based on user input.


```go
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiX } from 'react-icons/fi';
import { Textarea, Input, Spacer } from "@nextui-org/react";
import { handleImageGeneration } from '@/app/actions';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import React from 'react';
import { saveAs } from "file-saver";

interface GeneratedImage {
  url: string;
  prompt: string;
  loading: boolean;
}

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      setSelectedImage(generatedImages[selectedImageIndex]);
    }
  }, [selectedImageIndex, generatedImages]);

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 < generatedImages.length ? prevIndex + 1 : 0
    );
  };

  const showPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : generatedImages.length - 1
    );
  };

  const handleImageClick = (image: GeneratedImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, isTest = false) => {
    e.preventDefault();

    const formData = { prompt, openaiKey };
    setGeneratedImages(prevImages => [...prevImages, { url: "", prompt: isTest ? "TEST: " + prompt : prompt, loading: true }]);

    try {
      const imgData = await handleImageGeneration(formData, isTest);
      const generatedImage: GeneratedImage = {
        url: imgData.url,
        prompt: isTest ? "TEST: " + imgData.url : prompt,
        loading: false
      };
      setGeneratedImages(prevImages => [...prevImages.slice(0, -1), generatedImage]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setPrompt("");
  };

  const handleSpecialButtonClick = async () => {
    await handleSubmit(new Event('submit') as any, true);
  };

  const handleGeneratedImageClose = (index: number) => {
    setGeneratedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const saveImage = (url: string, filename: string) => {
    saveAs(url, filename);
  };

  return (
    <>
      <button
        className={`fixed z-50 top-4 left-4 text-3xl ${isDrawerOpen ? 'hidden' : 'block'}`}
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open drawer"
      >
        <FiArrowRight />
      </button>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-40 h-full w-64 overflow-y-auto bg-white px-3 py-4 dark:bg-black dark:border-slate-700"
            aria-label="Sidebar"
          >
            <button
              className="absolute top-4 right-4 text-3xl"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close drawer"
            >
              <FiX />
            </button>

            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <span className="text-base font-semibold">Image Generator</span>
              </div>
              <Textarea
                placeholder="Type something..."
                minRows={10}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                type="text"
                placeholder="Type something..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
              />
              <div className="flex justify-center mt-4">
                <button type="submit" className="relative p-[3px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                  <div className="relative px-8 py-2 bg-black text-white rounded-[6px] group transition duration-200 hover:bg-transparent">
                    Generate Image
                  </div>
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button type="button" id="btn-test-image" className="relative p-[3px]" onClick={handleSpecialButtonClick}>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                  <div className="relative px-8 py-2 bg-black text-white rounded-[6px] group transition duration-200 hover:bg-transparent">
                    Generate Test Image
                  </div>
                </button>
              </div>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.main
        className={`h-full transition-all duration-300 ease-in-out ${isDrawerOpen ? 'sm:ml-64' : 'sm:ml-0'}`}
      >
        <div className="p-4">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
            {generatedImages.length > 0 && (
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 sm:grid-cols-1">
                {generatedImages.map((generatedImg, index) => (
                  <React.Fragment key={index}>
                    {generatedImg.loading ? (
                      <motion.div>
                        <Card className="">
                          <EvervaultCard />
                        </Card>
                      </motion.div>
                    ) : (
                      <div>
                        <Card>
                          <motion.div>
                            <CardHeader className="absolute bg-none top-0 z-20 flex justify-end">
                              <button
                                className="p-1"
                                onClick={() => handleGeneratedImageClose(index)}
                                aria-label="Close"
                              >
                                <BackgroundGradient className="p-0.5">
                                  <FiX className="text-xl"></FiX>
                                </BackgroundGradient>
                              </button>
                            </CardHeader>
                            <button className="cursor-pointer" onClick={() => handleImageClick(generatedImg, index)}>
                              <Image alt="Generated Image" className="object-cover" src={generatedImg.url} />
                            </button>
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                              <div className="flex flex-grow gap-2 items-center">
                                <p className="text-tiny text-white/60">"{generatedImg.prompt}"</p>
                              </div>
                              <Button
                                radius="full"
                                color="success"
                                size="sm"
                                className="mr-2"
                                onClick={() => saveImage(generatedImg.url, `GeneratedImage-${new Date().toISOString()}.png`)}
                              >
                                Save
                              </Button>
                              <ButtonNMB className="bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white" radius="full" size="sm">
                                Explore
                              </ButtonNMB>
                            </CardFooter>
                          </motion.div>
                        </Card>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={selectedImage !== null} onClose={closeModal} size="2xl" backdrop="blur" isDismissable={false} isKeyboardDismissDisabled={true} className="font-sans">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">{selectedImage?.prompt}</ModalHeader>
            <ModalBody>
              <Image src={selectedImage?.url} alt="Selected Image" className="object-cover" style={{ width: '100%' }} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                Close
              </Button>
              <Button color="danger" variant="bordered" onPress={closeModal}>
                Action
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </motion.main>
    </>
  );
};

export default Drawer;
```


***Highlighted Benefits:***

**Colocated Logic: **The handleImageGeneration function is defined as a server action but used within the client component. This colocates the logic, making it easier to understand and maintain.

**Efficient State Management:** By leveraging server actions, the state of image generation is managed seamlessly within the client component. This ensures that the UI can be updated immediately with placeholder content and then replaced with the generated images once the server action completes.

**Improved User Experience: **The reduced latency and efficient state management contribute to a smoother user experience. Users receive immediate feedback when generating images, even if the actual generation process takes a bit longer.

**Security:** Sensitive operations, such as accessing the OpenAI key and performing image generation, are securely handled on the server, reducing the risk of exposing sensitive information to the client.
