const canvas = document.getElementById("canvas");
import AppState from "./appState.js";

if (canvas.getContext) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  const appState = new AppState(context);
  const tools = document.querySelectorAll("#tools .item");
  const fillColors = document.querySelectorAll("#fill-colors .item");
  const strokeColors = document.querySelectorAll("#stroke-colors .item");
  const lineWidthSlider = document.querySelector("#line-width-slider");
  const lineWidthSliderLabel = document.querySelector(
    'label[for="line-width-slider"]',
  );
  appState.addMouseEventListeners(
    canvas,
    tools,
    fillColors,
    strokeColors,
    lineWidthSlider,
    lineWidthSliderLabel,
  );
  appState.addKeyboardEventListeners(
    tools,
    fillColors,
    lineWidthSlider,
    lineWidthSliderLabel,
  );
} else {
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
