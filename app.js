const token = "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";

const inputTxt = document.getElementById("input");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const button = document.getElementById("btn");

// Updated query function to accept a modelId parameter
async function query(modelId) {
  // Set the respective images to a loading GIF while fetching the result
  image1.src = "/loading.gif"; 
  image2.src = "/loading.gif";

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`|| `https://api-inference.huggingface.co/models/${mode2Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: inputTxt.value }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob(); // Get the image as a blob
    return result;
  } catch (error) {
    console.error("Error fetching the image:", error);
    image1.src = ""; // Clear the image sources if an error occurs
    image2.src = "";
  }
}

button.addEventListener("click", async function () {
  // Fetch and display two different images using different model IDs
  const modelId1 = "black-forest-labs/FLUX.1-schnell"; // First model ID
  const modelId2 = "stabilityai/stable-diffusion-xl-base-1.0"; // Replace with the second model ID

  const response1 = await query(modelId1); // Fetch the first image
  const response2 = await query(modelId2); // Fetch the second image

  if (response1 && response2) {
    const objectURL1 = URL.createObjectURL(response1); // Create URLs for both image blobs
    const objectURL2 = URL.createObjectURL(response2);

    image1.src = objectURL1; // Display the first image
    image2.src = objectURL2; // Display the second image

    image1.height = 570;
    image2.height = 570;
  }
});


// "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"