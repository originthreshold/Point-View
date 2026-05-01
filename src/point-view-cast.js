import { POINT_VIEW_V1_MODEL_NAME, POINT_VIEW_V1_STATUS } from "./point-view-defaults.js";
import { buildRaySamplePoints } from "./point-view-ray.js";
import { getColorAtPoint, colorToRgbString } from "./point-view-color.js";
import { evaluatePerceptionStep } from "./point-view-hit.js";

function getTravelDistance(startPoint, endPoint) {
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export function castPointViewRay({
  imageData,
  originPoint,
  angleDegrees,
  params,
}) {
  if (!imageData || typeof imageData.width !== "number" || typeof imageData.height !== "number") {
    throw new Error("Valid imageData is required.");
  }

  if (!originPoint || typeof originPoint.x !== "number" || typeof originPoint.y !== "number") {
    throw new Error("Valid originPoint is required.");
  }

  if (!params || typeof params.step_size !== "number") {
    throw new Error("Valid params with step_size are required.");
  }

  const samplePoints = buildRaySamplePoints({
    originPoint,
    angleDegrees,
    stepSize: params.step_size,
    imageWidth: imageData.width,
    imageHeight: imageData.height,
  });

  if (samplePoints.length === 0) {
    return {
      model_name: POINT_VIEW_V1_MODEL_NAME,
      point: originPoint,
      angle: angleDegrees,
      start_color: null,
      hit_point: null,
      hit_color: null,
      steps: 0,
      travel_distance: 0,
      local_change: 0,
      origin_drift: 0,
      accumulated_drift: 0,
      hit_type: null,
      status: POINT_VIEW_V1_STATUS.OUT_OF_BOUNDS,
      raw_strip: [],
      logic_strip: [],
      raw_strip_samples: 0,
      raw_strip_hit_index: null,
      logic_strip_samples: 0,
      logic_strip_hit_index: null,
    };
  }

  const originSamplePoint = samplePoints[0];
  const originColor = getColorAtPoint(imageData, originSamplePoint);

  const rawStrip = [
    {
      index: 0,
      point: originSamplePoint,
      color: originColor,
      color_rgb: colorToRgbString(originColor),
    },
  ];

  const logicStrip = [
    {
      index: 0,
      point: originSamplePoint,
      local_change: 0,
      origin_drift: 0,
      accumulated_drift: 0,
      perception_band: "origin",
      drift_contribution: 0,
      hit_type: null,
      should_stop: false,
    },
  ];

  let accumulatedDrift = 0;
  let hitIndex = samplePoints.length - 1;
  let hitType = null;
  let finalLocalChange = 0;
  let finalOriginDrift = 0;

  for (let i = 1; i < samplePoints.length; i += 1) {
    const currentPoint = samplePoints[i];
    const previousColor = rawStrip[i - 1].color;
    const currentColor = getColorAtPoint(imageData, currentPoint);

    rawStrip.push({
      index: i,
      point: currentPoint,
      color: currentColor,
      color_rgb: colorToRgbString(currentColor),
    });

    const stepResult = evaluatePerceptionStep({
      previousColor,
      currentColor,
      originColor,
      accumulatedDrift,
      params,
    });

    logicStrip.push({
      index: i,
      point: currentPoint,
      ...stepResult,
    });

    accumulatedDrift = stepResult.accumulated_drift;
    finalLocalChange = stepResult.local_change;
    finalOriginDrift = stepResult.origin_drift;

    if (stepResult.should_stop) {
      hitIndex = i;
      hitType = stepResult.hit_type;
      break;
    }
  }

  const hitPoint = rawStrip[hitIndex].point;
  const hitColor = rawStrip[hitIndex].color;

  return {
    model_name: POINT_VIEW_V1_MODEL_NAME,
    point: originSamplePoint,
    angle: angleDegrees,
    start_color: colorToRgbString(originColor),
    hit_point: hitPoint,
    hit_color: colorToRgbString(hitColor),
    steps: hitIndex,
    travel_distance: getTravelDistance(originSamplePoint, hitPoint),
    local_change: finalLocalChange,
    origin_drift: finalOriginDrift,
    accumulated_drift: accumulatedDrift,
    hit_type: hitType,
    status: POINT_VIEW_V1_STATUS.RAY_CAST_COMPLETE,
    raw_strip: rawStrip,
    logic_strip: logicStrip,
    raw_strip_samples: rawStrip.length,
    raw_strip_hit_index: hitIndex,
    logic_strip_samples: logicStrip.length,
    logic_strip_hit_index: hitIndex,
  };
}