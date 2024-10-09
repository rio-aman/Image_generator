const token = "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";

const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
  image.src = "/loading.gif"; // Display loading image while fetching the result

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/glif/90s-anime-art", {
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
    image.src = ""; // Clear the image source if an error occurs
  }
}

button.addEventListener("click", async function () {
  query().then((response) => {
    if (response) {
      const objectURL = URL.createObjectURL(response); // Create a URL for the image blob
      image.src = objectURL; // Set the image src to display the result
    }
  });
});
