'use server'
import OpenAI from 'openai';
interface ImageReturn {
  success: boolean;
  message: string;
  url: string;
}


export async function handleImageGeneration(formData, test): Promise<ImageReturn> {
  let openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });
  console.log('tryingh')
  let imgReturn = {
    success: true,
    message: "Image generated successfully.",
    url: ""
  }
  if (!test) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: formData.prompt,
        n: 1,
        size: "1792x1024",
      })

      imgReturn.success = true;
      imgReturn.message = "Image generated successfully.";
      imgReturn.url = response.data[0].url || '';

    } catch (e) {
      imgReturn.success = false;
      imgReturn.message = "Failed to generate image. " + e.message;
    }
    console.log(imgReturn)
    return imgReturn;
  }

  //Test, generate test image

  imgReturn.url = await randomImage();
  console.log(imgReturn)
  return imgReturn;



}

//test function to save on API calls. Returns a random image from array
async function randomImage(): Promise<string> {
  const images = [
    "/img/test/woods.png",
    "/img/test/stargaze.png",
    "/img/test/pondering.png",
    "/img/test/neoncity.png",
    "/img/test/dog-and-cat.png",
    "/img/test/cyber-cabin-woods.png",
    "/img/test/arrow-of-time.png",
    "/img/test/arrow.png"
  ];
  //return random image from images after two seconds.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(images[Math.floor(Math.random() * images.length)]);
    }, 50);
  });


}

