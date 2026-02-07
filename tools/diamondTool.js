import ShapeTool from "./shapeTool.js";
import Diamond from "../shapes/diamond.js";

export default class DiamondTool extends ShapeTool {
  constructor(context, shapes) {
    super(context, shapes);
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.mousePressed) return;
    if (this.shiftPressed) {
      mouseX = mouseY - this.shapeStartY + this.shapeStartX;
    }

    Diamond.drawPreview(
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
      new Diamond(
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

    this.shapes[this.shapes.length - 1].draw();
  }
}
