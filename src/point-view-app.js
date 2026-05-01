import { createPointViewUiState } from "./point-view-ui-shell.js";
import { renderPointViewShell } from "./point-view-dom.js";

export function initializePointViewApp(rootElement) {
  const uiState = createPointViewUiState();
  const appElement = renderPointViewShell(rootElement, uiState);

  return {
    ui_state: uiState,
    app_element: appElement,
  };
}