export const POINT_VIEW_V1_DEFAULTS = {
  step_size: 1,
  noise_floor: 2,
  cluster_ceiling: 30,
  boundary_threshold: 60,
  origin_threshold: 130,
  drift_threshold: 60,
  soft_weight: 0.5,
};

export const POINT_VIEW_V1_PARAMETER_ORDER = [
  "step_size",
  "noise_floor",
  "cluster_ceiling",
  "boundary_threshold",
  "origin_threshold",
  "drift_threshold",
  "soft_weight",
];

export const POINT_VIEW_V1_HIT_TYPES = [
  "boundary_jump",
  "accumulated_drift",
  "origin_drift",
];

export const POINT_VIEW_V1_STATUS = {
  IDLE: "idle",
  READY: "ready",
  RAY_CAST_COMPLETE: "ray cast complete",
  OUT_OF_BOUNDS: "out of bounds",
};

export const POINT_VIEW_V1_MODEL_NAME = "Point View V1";