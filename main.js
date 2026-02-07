const canvas = document.getElementById("canvas");
import AppContext from "./appContext.js";
import AppState from "./appState.js";

if (canvas.getContext) {
  // canvas is supported - rendering code
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  // const app = new AppContext(context);
  const appState = new AppState(context);
  const tools = document.querySelectorAll("#tools .item");
  const colors = document.querySelectorAll("#colors .item");
  appState.addMouseEventListeners(canvas, tools, colors);
  appState.addKeyboardEventListeners(tools, colors);

  // window.onkeydown = (event) => {
  //   app.handleKeyPress(event.key);
  // };

  // window.onkeyup = (event) => {
  //   app.handleKeyRelease(event.key);
  // };

  // canvas.onmousedown = (event) => {
  //   app.handleMousePress(event.offsetX, event.offsetY);
  // };

  // canvas.onmousemove = (event) => {
  //   app.handleMouseMove(event.offsetX, event.offsetY);
  // };

  // canvas.onmouseup = (event) => {
  //   app.handleMouseRelease(event.offsetX, event.offsetY);
  // };
} else {
  // canvas is not supported
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
