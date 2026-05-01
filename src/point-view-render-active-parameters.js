export function renderActiveParametersSection(uiState) {
  if (!uiState || !uiState.params || !Array.isArray(uiState.parameter_order)) {
    throw new Error("Valid uiState with params and parameter_order is required.");
  }

  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-point-view-active-parameters", "true");

  for (const key of uiState.parameter_order) {
    const row = document.createElement("div");
    row.setAttribute("data-point-view-parameter", key);

    const label = document.createElement("strong");
    label.textContent = `${key}: `;

    const value = document.createElement("span");
    value.textContent = String(uiState.params[key]);

    row.appendChild(label);
    row.appendChild(value);
    wrapper.appendChild(row);
  }

  return wrapper;
}