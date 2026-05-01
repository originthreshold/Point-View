import { createPointViewUiState } from "./point-view-ui-shell.js";
import { renderImageViewSection } from "./point-view-render-image-view.js";
import { renderActiveParametersSection } from "./point-view-render-active-parameters.js";
import { renderRayReadoutSection } from "./point-view-render-ray-readout.js";
import { renderTestControlsSection } from "./point-view-render-test-controls.js";

function createSectionElement(section) {
  const wrapper = document.createElement("section");
  wrapper.setAttribute("data-point-view-section", section.key);

  const heading = document.createElement("h2");
  heading.textContent = section.label;

  const body = document.createElement("div");
  body.setAttribute("data-point-view-section-body", section.key);
  body.textContent = `${section.label} not yet wired.`;

  wrapper.appendChild(heading);
  wrapper.appendChild(body);

  return wrapper;
}

function createReadoutPreview(uiState) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-point-view-readout-preview", "true");

  const items = [
    ["Model", uiState.model_name],
    ["Selected Point", uiState.selected_point ? `(${uiState.selected_point.x}, ${uiState.selected_point.y})` : "none"],
    ["Angle", `${uiState.angle_degrees}°`],
    ["Image Size", `${uiState.image_width} × ${uiState.image_height}`],
  ];

  for (const [label, value] of items) {
    const row = document.createElement("div");
    row.setAttribute("data-point-view-row", label.toLowerCase().replace(/\s+/g, "_"));

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    const text = document.createElement("span");
    text.textContent = value;

    row.appendChild(strong);
    row.appendChild(text);
    wrapper.appendChild(row);
  }

  return wrapper;
}

function populateSectionBodies(appElement, uiState) {
  const imageViewBody = appElement.querySelector(
    '[data-point-view-section-body="image_view"]'
  );

  if (imageViewBody) {
    imageViewBody.innerHTML = "";
    imageViewBody.appendChild(renderImageViewSection(uiState));
  }

  const rayReadoutBody = appElement.querySelector(
    '[data-point-view-section-body="ray_readout"]'
  );

  if (rayReadoutBody) {
    rayReadoutBody.innerHTML = "";
    rayReadoutBody.appendChild(renderRayReadoutSection(uiState));
  }

  const testControlsBody = appElement.querySelector(
    '[data-point-view-section-body="test_controls"]'
  );

  if (testControlsBody) {
    testControlsBody.innerHTML = "";
    testControlsBody.appendChild(renderTestControlsSection());
  }

  const activeParametersBody = appElement.querySelector(
    '[data-point-view-section-body="active_parameters"]'
  );

  if (activeParametersBody) {
    activeParametersBody.innerHTML = "";
    activeParametersBody.appendChild(renderActiveParametersSection(uiState));
  }
}

export function renderPointViewShell(rootElement, uiState = createPointViewUiState()) {
  if (!(rootElement instanceof HTMLElement)) {
    throw new Error("A valid rootElement is required.");
  }

  rootElement.innerHTML = "";

  const app = document.createElement("div");
  app.setAttribute("data-point-view-app", "true");

  const title = document.createElement("h1");
  title.textContent = uiState.model_name;

  const summary = document.createElement("p");
  summary.textContent =
    "Point-centered perception shell loaded. Core V1 logic is present. UI wiring is still in progress.";

  const readoutPreview = createReadoutPreview(uiState);

  const sectionsContainer = document.createElement("div");
  sectionsContainer.setAttribute("data-point-view-sections", "true");

  for (const section of uiState.sections) {
    sectionsContainer.appendChild(createSectionElement(section));
  }

  app.appendChild(title);
  app.appendChild(summary);
  app.appendChild(readoutPreview);
  app.appendChild(sectionsContainer);

  rootElement.appendChild(app);

  populateSectionBodies(app, uiState);

  return app;
}