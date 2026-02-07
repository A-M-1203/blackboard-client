import Shape_Tool from "./shapeTool.js";
import Rectangle from "../shapes/Rectangle.js";

export default class RectangleTool extends Shape_Tool {
  constructor(context, shapes) {
    super(context, shapes);
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.mousePressed) return;
    if (this.shiftPressed) {
      mouseX = mouseY - this.shapeStartY + this.shapeStartX;
    }

    Rectangle.drawPreview(
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
      new Rectangle(
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
