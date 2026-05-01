function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error("A valid file is required."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(file);
  });
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image element."));
    image.src = src;
  });
}

function getImageCanvas(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("2D canvas context is not available.");
  }

  context.drawImage(image, 0, 0);

  return { canvas, context };
}

export async function loadImageDataFromFile(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImageElement(dataUrl);
  const { context } = getImageCanvas(image);
  const imageData = context.getImageData(0, 0, image.width, image.height);

  return {
    image,
    image_data: imageData,
    image_width: image.width,
    image_height: image.height,
  };
}