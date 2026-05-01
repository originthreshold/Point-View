export function degreesToRadians(angleDegrees) {
  return (angleDegrees * Math.PI) / 180;
}

export function getRayDirection(angleDegrees) {
  const theta = degreesToRadians(angleDegrees);

  return {
    dx: Math.cos(theta),
    dy: Math.sin(theta),
  };
}

export function getRayPosition(originPoint, angleDegrees, stepIndex, stepSize) {
  const { dx, dy } = getRayDirection(angleDegrees);

  return {
    x: originPoint.x + stepIndex * stepSize * dx,
    y: originPoint.y + stepIndex * stepSize * dy,
  };
}

export function toImageSamplePoint(point) {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };
}

export function isPointInBounds(point, imageWidth, imageHeight) {
  return (
    point.x >= 0 &&
    point.y >= 0 &&
    point.x < imageWidth &&
    point.y < imageHeight
  );
}

export function buildRaySamplePoints({
  originPoint,
  angleDegrees,
  stepSize,
  imageWidth,
  imageHeight,
}) {
  const samplePoints = [];
  let stepIndex = 0;

  while (true) {
    const floatingPoint = getRayPosition(
      originPoint,
      angleDegrees,
      stepIndex,
      stepSize
    );

    const imagePoint = toImageSamplePoint(floatingPoint);

    if (!isPointInBounds(imagePoint, imageWidth, imageHeight)) {
      break;
    }

    const previousPoint = samplePoints[samplePoints.length - 1];

    if (
      previousPoint &&
      previousPoint.x === imagePoint.x &&
      previousPoint.y === imagePoint.y
    ) {
      stepIndex += 1;
      continue;
    }

    samplePoints.push(imagePoint);
    stepIndex += 1;
  }

  return samplePoints;
}