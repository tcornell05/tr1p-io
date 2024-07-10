"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiX } from 'react-icons/fi';
import { Textarea, Input, Spacer } from "@nextui-org/react";
import { handleImageGeneration } from '@/app/actions';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooterProps, ModalFooter, useDisclosure } from "@nextui-org/react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { EvervaultCard } from "@/components/ui/evervault-card";
import Beam from "@/components/ui/beam";
import { ButtonMB, ButtonNMB } from "@/components/ui/button-moving-border";
import React from 'react';
import { saveAs } from "file-saver";

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
interface GeneratedImage {
  url: string;
  prompt: string;
  loading: boolean;
}

export const maxDuration = 45;
const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prompt, setPrompt] = useState(""); // Add state to hold the Textarea value
  const [openaiKey, setOpenaiKey] = useState(""); // Add state to hold the Textarea value
  const [generatedImages, setGeneratedImages] = useState([]); // Change this to an array to hold multiple URLs
  const [selectedImage, setSelectedImage] = useState(null); // New state for tracking the selected image for the modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Now tracking the index

  const [isTestButtonClicked, setIsTestButtonClicked] = useState(false); // New state


  // Calculate arrow positions dynamically or use a fixed position that works well with your modal size
  const arrowStyle = {
    position: 'fixed',
    top: '50%', // Center vertically
    zIndex: 1000, // Ensure it's above most elements
    cursor: 'pointer',
  };

  const leftArrowStyle = {
    ...arrowStyle,
    left: 'calc(50% - 420px)', // Adjust based on your modal width
  };

  const rightArrowStyle = {
    ...arrowStyle,
    right: 'calc(50% - 420px)', // Adjust based on your modal width
  };

  useEffect(() => {
    console.log(selectedImageIndex, 'has been updated');
    if (selectedImageIndex !== null) {
      setSelectedImage(generatedImages[selectedImageIndex]);
    }
  }, [selectedImageIndex, generatedImages]);

  const showNextImage = () => {
    console.log(selectedImageIndex, 'plusok')
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 < generatedImages.length ? prevIndex + 1 : 0
    );
    console.log(selectedImageIndex)
    setSelectedImage(generatedImages[selectedImageIndex])
  };

  const showPreviousImage = () => {
    console.log(selectedImageIndex, 'minusok');
    setSelectedImageIndex((prevIndex) => {
      const index = prevIndex !== null ? prevIndex : 0;
      return index - 1 >= 0 ? index - 1 : generatedImages.length - 1;
    });
    console.log(selectedImageIndex);
    setSelectedImage(generatedImages[selectedImageIndex]);
  };
  // Function to handle image click, setting the selected image
  const handleImageClick = (image, index) => {
    console.log(image)
    setSelectedImage(image); // Set the selected image to show it in the modal
    setSelectedImageIndex(index);
    onOpen();
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null); // Clear the selected image
  };


  const contentVariants = {
    open: { marginLeft: '16rem' },
    closed: { marginLeft: 0 },
  };



  const handleSubmit = async (e, isTest = false) => {
    e.preventDefault();

    const formData = { prompt, openaiKey };

    // Immediately add a placeholder for the loading image
    setGeneratedImages(prevImages => [...prevImages, { url: "", prompt: isTest ? "TEST: " + prompt : prompt, loading: true }]);

    try {
      console.log(isTest);

      const imgData = await handleImageGeneration(formData, isTest);
      const generatedImage: GeneratedImage = {
        url: imgData.url,
        prompt: isTest ? "TEST: " + imgData.url : prompt,
        loading: false // Image has finished loading
      }
      // Replace the last placeholder item with the actual image data
      setGeneratedImages(prevImages => [...prevImages.slice(0, -1), generatedImage]);

      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle failed image generation, like removing the placeholder
    }

    setPrompt("");
  };

  // Handler for the test button
  const handleSpecialButtonClick = async () => {
    setIsTestButtonClicked(true); // Update the state to indicate the special button was clicked
    // Assuming you want to submit the form automatically when this button is clicked
    await handleSubmit(new Event('submit'), true);
  };

  const handleGeneratedImageClose = async (index) => {
    setGeneratedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const saveImage = async (url, filename) => {
    saveAs(
      url,
      filename
    );
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>

      {/* Button to open the drawer */}
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
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                  <div
                    className="relative px-8 py-2 bg-black text-white rounded-[6px] group transition duration-200 hover:bg-transparent">
                    Generate Image
                  </div>
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button type="button" id="btn-test-image" className="relative p-[3px]"
                  onClick={handleSpecialButtonClick}>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                  <div
                    className="relative px-8 py-2 bg-black text-white rounded-[6px] group transition duration-200 hover:bg-transparent">
                    Generate Test Image
                  </div>
                </button>
              </div>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.main
        variants={contentVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`h-full transition-all duration-300 ease-in-out ${isDrawerOpen ? 'sm:ml-64' : 'sm:ml-0'}`}
      >
        <div className="p-4">

          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
            {generatedImages.length > 0 && (

              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 sm:grid-cols-1">

                {generatedImages.map((generatedImg, index) => (
                  <React.Fragment key={index}>
                    {generatedImg.loading ? (
                      // Show a skeleton or placeholder if the image is loading
                      <motion.div>
                        <Card className="">
                          <EvervaultCard />
                        </Card>
                      </motion.div>
                    ) : (


                      <div>
                        <Card>
                          <motion.div>

                            <CardHeader
                              className={`absolute bg-none top-0 z-20 flex justify-end`}>
                              <button
                                className="p-1" // Padding for easier clicking, adjust as needed
                                onClick={() => {
                                  handleGeneratedImageClose(index);
                                }}
                                aria-label="Close" // Accessibility label for screen readers
                              >
                                <BackgroundGradient className={`p-0.5`}>
                                  <FiX className={`text-xl`}></FiX>
                                </BackgroundGradient>
                              </button>
                            </CardHeader>
                            <button className={`cursor-pointer`} onClick={() => {
                              handleImageClick(generatedImg, index)
                            }}>
                              <Image
                                alt={`Generated Image`}
                                className="object-cover"
                                src={generatedImg.url}
                              />
                            </button>
                            <CardFooter
                              className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                              <div className="flex flex-grow gap-2 items-center">
                                <p className="text-tiny text-white/60">"{generatedImg.prompt}"</p>
                              </div>
                              <Button
                                radius="full"
                                color="success"
                                size={`sm`}
                                className="mr-2"
                                onClick={() => saveImage(generatedImg.url, `GeneratedImage-${new Date().toISOString()}.png`)}
                              >
                                Save
                              </Button>
                              <ButtonNMB
                                className={`bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white`}
                                radius="full"
                                size={`sm`}
                              >Explore</ButtonNMB>
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
        {/* Modal for displaying the selected image */}
        {isOpen && (
          <>
            <FiArrowLeft size={30} onClick={showPreviousImage} />
            <FiArrowRight size={30} onClick={showNextImage} />
          </>
        )}

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size={`2xl`}
          backdrop={"blur"}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          className={`font-sans`}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{selectedImage.prompt}</ModalHeader>
                <ModalBody>
                  <Image
                    src={selectedImage.url}
                    alt="Selected Image"
                    className="object-cover"
                    style={{ width: '100%' }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" variant="bordered" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </motion.main>
    </>
  );
};

export default Drawer;
