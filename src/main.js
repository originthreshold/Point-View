import { initializePointViewApp } from "./point-view-app.js";

function startPointView() {
  const rootElement = document.getElementById("point-view-root");

  if (!rootElement) {
    throw new Error('Missing root element with id "point-view-root".');
  }

  initializePointViewApp(rootElement);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startPointView);
} else {
  startPointView();
}