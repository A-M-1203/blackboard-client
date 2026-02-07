const canvas = document.getElementById("canvas");
import AppState from "./appState.js";

if (canvas.getContext) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  const appState = new AppState(context);
  const tools = document.querySelectorAll("#tools .item");
  const colors = document.querySelectorAll("#colors .item");
  appState.addMouseEventListeners(canvas, tools, colors);
  appState.addKeyboardEventListeners(tools, colors);
} else {
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
