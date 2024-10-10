const token = "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";

const inputTxt = document.getElementById("input");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const button = document.getElementById("btn");

// Updated query function to accept both modelId and prompt as parameters
async function query(modelId, prompt) {
  try {
    // Fetch from the API
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.blob(); // Get the image as a blob
    return result;
  } catch (error) {
    console.error("Error fetching the image:", error);
    return null;
  }
}

button.addEventListener("click", async function () {
  // Set the images to a loading GIF while waiting for the result
  image1.src = "/loading.gif";
  image2.src = "/loading.gif";

  // Fetch and display two different images using the same model ID but different prompts
  const modelId = "black-forest-labs/FLUX.1-schnell"; // The same model ID for both
  const prompt1 = inputTxt.value + " variation 1"; // Slightly modify the input to create variation
  const prompt2 = inputTxt.value + " variation 2"; // Another variation for the second request

  const response1 = await query(modelId, prompt1); // Fetch the first image with the first prompt
  const response2 = await query(modelId, prompt2); // Fetch the second image with the second prompt

  if (response1 && response2) {
    const objectURL1 = URL.createObjectURL(response1); // Create URLs for both image blobs
    const objectURL2 = URL.createObjectURL(response2);

    image1.src = objectURL1; // Display the first image
    image2.src = objectURL2; // Display the second image

    image1.height = 570;
    image2.height = 570;
  } else {
    console.error("Failed to fetch one or both images.");
    image1.src = ""; // Clear the image sources if an error occurs
    image2.src = "";
  }
});