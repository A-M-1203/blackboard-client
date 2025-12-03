import SelectTool from "./tools/selectTool.js";
import PencilTool from "./tools/pencilTool.js";
import BrushTool from "./tools/brushTool.js";
import FillTool from "./tools/fillTool.js";
import ShapeTool from "./tools/shapeTool.js";

const DEFAULT_BACKGROUND_COLOR = "#141414";
const DEFAULT_STROKE_COLOR = "#ffffffff";
const DEFAULT_FILL_COLOR = DEFAULT_BACKGROUND_COLOR;
const DEFAULT_LINE_WIDTH = 1.0;

export default class AppContext {
  constructor(context) {
    this.context = context;

    this.shapes = [];
    this.tools = [];
    this.tools.push(new SelectTool(context));
    this.tools.push(
      new PencilTool(context, DEFAULT_STROKE_COLOR, DEFAULT_LINE_WIDTH)
    );
    this.tools.push(
      new BrushTool(context, DEFAULT_STROKE_COLOR, DEFAULT_LINE_WIDTH)
    );
    this.tools.push(new FillTool(context, DEFAULT_FILL_COLOR));
    this.tools.push(
      new ShapeTool(
        context,
        DEFAULT_STROKE_COLOR,
        DEFAULT_FILL_COLOR,
        DEFAULT_LINE_WIDTH,
        context.canvas.width,
        context.canvas.height
      )
    );
    this.selectedTool = this.tools[1].activate();
  }

  handleMousePress(mouseX, mouseY) {
    this.selectedTool.handleMousePress(mouseX, mouseY);
  }

  handleMouseMove(mouseX, mouseY) {
    this.selectedTool.handleMouseMove(mouseX, mouseY);
  }

  handleMouseRelease(mouseX, mouseY) {
    this.selectedTool.handleMouseRelease(mouseX, mouseY);
  }

  handleKeyPress(key) {
    switch (key) {
      case "S":
        this.selectedTool = this.tools[0].activate(this.shapes);
        break;
      case "P":
        this.selectedTool = this.tools[1].activate(key);
        break;
      case "B":
        this.selectedTool = this.tools[2].activate(key);
        break;
      case "F":
        this.selectedTool = this.tools[3].activate(this.shapes);
        break;
      case "R":
      case "O":
      case "T":
      case "D":
      case "Q":
      case "A":
      case "X":
      case "Z":
      case "I":
      case "J":
      case "L":
      case "K":
      case "W":
        this.selectedTool = this.tools[4].activate(key, this.shapes);
        break;
      case "r":
      case "g":
      case "b":
      case "w":
      case "+":
      case "-":
      case "Shift":
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        this.selectedTool.handleKeyPress(key);
        break;
    }
  }

  handleKeyRelease(key) {
    this.selectedTool.handleKeyRelease(key);
  }
}

// const app = new AppContext();
// export default app;
