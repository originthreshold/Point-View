import {
  POINT_VIEW_V1_MODEL_NAME,
  POINT_VIEW_V1_DEFAULTS,
  POINT_VIEW_V1_PARAMETER_ORDER,
} from "./point-view-v1.js";

export const POINT_VIEW_UI_SECTION_ORDER = [
  "image_view",
  "ray_readout",
  "raw_strip",
  "logic_strip",
  "test_controls",
  "active_parameters",
];

export const POINT_VIEW_UI_SECTION_LABELS = {
  image_view: "Image View",
  ray_readout: "Ray Readout",
  raw_strip: "Raw Strip",
  logic_strip: "Perception Logic Strip",
  test_controls: "Test Controls",
  active_parameters: "Active Parameters",
};

export function createPointViewUiState() {
  return {
    model_name: POINT_VIEW_V1_MODEL_NAME,
    image_data: null,
    image_width: 0,
    image_height: 0,
    selected_point: null,
    angle_degrees: 0,
    params: { ...POINT_VIEW_V1_DEFAULTS },
    parameter_order: [...POINT_VIEW_V1_PARAMETER_ORDER],
    ray_result: null,
    readout: null,
    sections: POINT_VIEW_UI_SECTION_ORDER.map((key) => ({
      key,
      label: POINT_VIEW_UI_SECTION_LABELS[key],
    })),
  };
}