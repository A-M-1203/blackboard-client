export default class SelectTool {
  constructor(context) {
    this.context = context;
    this.mousePressed = false;
    this.shapes = undefined;
    this.selectedShape = undefined;
    this.selectedResizePoint = -1;
    this.draggingOffsetX = undefined;
    this.draggingOffsetY = undefined;
  }

  activate(shapes) {
    this.shapes = shapes;
    return this;
  }

  handleMousePress(mouseX, mouseY) {
    this.mousePressed = true;
    if (this.selectedShape) {
      this.selectedResizePoint = this.selectedShape.isResizePointClicked(
        mouseX,
        mouseY
      );

      if (this.selectedResizePoint > -1) {
        return;
      }
    }
    this.selectedShape = undefined;
    for (const shape of this.shapes) {
      if (shape.isClicked(mouseX, mouseY)) {
        this.selectedShape = shape;
        this.draggingShape = shape;
        this.draggingOffsetX = mouseX - shape.boundingRectangle.points[0].x;
        this.draggingOffsetY = mouseY - shape.boundingRectangle.points[0].y;
        break;
      }
    }
    this.drawShapes();
  }

  handleMouseMove(mouseX, mouseY) {
    if (this.mousePressed) {
      if (this.selectedResizePoint > -1) {
        this.selectedShape.resize(this.selectedResizePoint, mouseX, mouseY);
      } else if (this.selectedShape) {
        this.selectedShape.boundingRectangle.points[0].x =
          mouseX - this.draggingOffsetX;
        this.selectedShape.boundingRectangle.points[0].y =
          mouseY - this.draggingOffsetY;

        this.selectedShape.boundingRectangle.points[1].x =
          this.selectedShape.boundingRectangle.points[0].x +
          this.selectedShape.boundingRectangle.width;
        this.selectedShape.boundingRectangle.points[1].y =
          this.selectedShape.boundingRectangle.points[0].y;

        this.selectedShape.boundingRectangle.points[2].x =
          this.selectedShape.boundingRectangle.points[1].x;
        this.selectedShape.boundingRectangle.points[2].y =
          this.selectedShape.boundingRectangle.points[1].y +
          this.selectedShape.boundingRectangle.height;

        this.selectedShape.boundingRectangle.points[3].x =
          this.selectedShape.boundingRectangle.points[0].x;
        this.selectedShape.boundingRectangle.points[3].y =
          this.selectedShape.boundingRectangle.points[2].y;
      }
      this.drawShapes();
    }
  }

  handleMouseRelease(mouseX, mouseY) {
    this.mousePressed = false;
  }

  handleKeyPress(key) {
    if (this.selectedShape) {
      switch (key) {
        case "r":
          this.selectedShape.strokeColor = "#ff0000";
          break;
        case "g":
          this.selectedShape.strokeColor = "#00ff00";
          break;
        case "b":
          this.selectedShape.strokeColor = "#0000ff";
          break;
        case "w":
          this.selectedShape.strokeColor = "#ffffff";
          break;
        case "+":
          if (this.selectedShape.lineWidth < 100.0) {
            this.selectedShape.lineWidth += 1;
          }
          break;
        case "-":
          if (this.selectedShape.lineWidth > 1.0) {
            this.selectedShape.lineWidth -= 1;
          }
          break;
      }
      this.drawShapes();
    }
  }

  handleKeyRelease(key) {}

  drawShapes() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    this.shapes.forEach((shape) => shape.draw());

    if (this.selectedShape) {
      this.selectedShape.drawClickedOutline("#ffff11");
    }
  }
}
