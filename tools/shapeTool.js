export default class ShapeTool {
  constructor(context, shapes) {
    this.context = context;
    this.shapeStartX = null;
    this.shapeStartY = null;
    this.shapePreview = null;
    this.shapes = shapes;
    this.mousePressed = false;
    this.shiftPressed = false;
  }

  handleMouseDown(mouseX, mouseY) {
    this.mousePressed = true;
    this.shapeStartX = mouseX;
    this.shapeStartY = mouseY;
    this.shapePreview = this.context.getImageData(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }

  handleKeyDown(key) {
    switch (key) {
      case "Shift":
        this.shiftPressed = true;
        break;
    }
  }

  handleKeyUp(key) {
    switch (key) {
      case "Shift":
        this.shiftPressed = false;
        break;
    }
  }

  drawShapes() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    for (let i = 0; i < this.shapes.length; ++i) {
      this.shapes[i].draw();
    }
  }
}
