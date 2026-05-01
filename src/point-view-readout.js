function formatNumber(value, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return value;
  }

  return value.toFixed(digits);
}

function formatPoint(point) {
  if (!point || typeof point.x !== "number" || typeof point.y !== "number") {
    return null;
  }

  return `(${point.x}, ${point.y})`;
}

export function buildPointViewReadout(rayResult) {
  if (!rayResult) {
    throw new Error("rayResult is required.");
  }

  return {
    model_name: rayResult.model_name,
    point: formatPoint(rayResult.point),
    angle: `${rayResult.angle}°`,
    start_color: rayResult.start_color,
    hit_point: formatPoint(rayResult.hit_point),
    hit_color: rayResult.hit_color,
    steps: rayResult.steps,
    travel_distance: formatNumber(rayResult.travel_distance),
    local_change: formatNumber(rayResult.local_change),
    origin_drift: formatNumber(rayResult.origin_drift),
    accumulated_drift: formatNumber(rayResult.accumulated_drift),
    hit_type: rayResult.hit_type,
    status: rayResult.status,
    raw_strip_samples: rayResult.raw_strip_samples,
    raw_strip_hit_index: rayResult.raw_strip_hit_index,
    logic_strip_samples: rayResult.logic_strip_samples,
    logic_strip_hit_index: rayResult.logic_strip_hit_index,
  };
}