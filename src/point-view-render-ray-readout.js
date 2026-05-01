function createReadoutRow(label, value) {
  const row = document.createElement("div");
  row.setAttribute("data-point-view-readout-row", label.toLowerCase().replace(/\s+/g, "_"));

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  const span = document.createElement("span");
  span.textContent = value;

  row.appendChild(strong);
  row.appendChild(span);

  return row;
}

export function renderRayReadoutSection(uiState) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-point-view-ray-readout", "true");

  if (!uiState || !uiState.readout) {
    const empty = document.createElement("p");
    empty.textContent = "No ray cast yet.";
    wrapper.appendChild(empty);
    return wrapper;
  }

  const rows = [
    ["Point", uiState.readout.point ?? "none"],
    ["Angle", uiState.readout.angle ?? "none"],
    ["Start Color", uiState.readout.start_color ?? "none"],
    ["Hit Point", uiState.readout.hit_point ?? "none"],
    ["Hit Color", uiState.readout.hit_color ?? "none"],
    ["Steps", String(uiState.readout.steps ?? 0)],
    ["Travel Distance", String(uiState.readout.travel_distance ?? 0)],
    ["Local Change", String(uiState.readout.local_change ?? 0)],
    ["Origin Drift", String(uiState.readout.origin_drift ?? 0)],
    ["Accumulated Drift", String(uiState.readout.accumulated_drift ?? 0)],
    ["Hit Type", uiState.readout.hit_type ?? "none"],
    ["Status", uiState.readout.status ?? "none"],
  ];

  for (const [label, value] of rows) {
    wrapper.appendChild(createReadoutRow(label, value));
  }

  return wrapper;
}