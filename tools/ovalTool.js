import Shape_Tool from "./shapeTool.js";
import Oval from "../shapes/Oval.js";

export default class OvalTool extends Shape_Tool {
  constructor(context, shapes) {
    super(context, shapes);
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.mousePressed) return;
    if (this.shiftPressed) {
      mouseX = mouseY - this.shapeStartY + this.shapeStartX;
    }

    Oval.drawPreview(
      this.shapeStartX,
      this.shapeStartY,
      mouseX,
      mouseY,
      this.context,
      this.shapePreview,
    );
  }

  handleMouseUp(mouseX, mouseY) {
    this.mousePressed = false;
    if (this.shiftPressed) {
      mouseX = mouseY - this.shapeStartY + this.shapeStartX;
    }

    this.shapes.push(
      new Oval(
        this.shapeStartX,
        this.shapeStartY,
        mouseX,
        mouseY,
        this.context,
        this.context.strokeStyle,
        this.context.fillStyle,
        this.context.lineWidth,
      ),
    );

    this.drawShapes();
  }
}
