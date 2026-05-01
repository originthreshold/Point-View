export function getImageDataIndex(point, imageWidth) {
  return (point.y * imageWidth + point.x) * 4;
}

export function getColorAtPoint(imageData, point) {
  if (!imageData || !imageData.data) {
    throw new Error("Valid imageData is required.");
  }

  const { width, height, data } = imageData;

  if (
    point.x < 0 ||
    point.y < 0 ||
    point.x >= width ||
    point.y >= height
  ) {
    throw new Error("Point is out of image bounds.");
  }

  const index = getImageDataIndex(point, width);

  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3],
  };
}

export function colorToRgbString(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}