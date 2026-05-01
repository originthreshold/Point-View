export function renderTestControlsSection() {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-point-view-test-controls", "true");

  const label = document.createElement("label");
  label.setAttribute("for", "point-view-image-file");
  label.textContent = "Load image: ";

  const input = document.createElement("input");
  input.id = "point-view-image-file";
  input.type = "file";
  input.accept = "image/*";

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}