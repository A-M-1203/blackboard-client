export default class SelectTool {
  constructor(context, shapes) {
    this.context = context;
    this.mousePressed = false;
    this.shapes = shapes;
    this.selectedShape = null;
    this.selectedResizePoint = -1;
    this.draggingOffsetX = null;
    this.draggingOffsetY = null;
    this.shiftPressed = false;
  }

  handleMouseDown(mouseX, mouseY) {
    this.mousePressed = true;
    if (this.selectedShape) {
      this.selectedResizePoint = this.selectedShape.isResizePointClicked(
        mouseX,
        mouseY,
      );

      if (this.selectedResizePoint > -1) {
        return;
      }
    }

    this.selectedShape = null;
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i].isClicked(mouseX, mouseY)) {
        this.selectedShape = this.shapes[i];
        this.draggingShape = this.shapes[i];
        this.draggingOffsetX =
          mouseX - this.shapes[i].boundingRectangle.points[0].x;
        this.draggingOffsetY =
          mouseY - this.shapes[i].boundingRectangle.points[0].y;
        break;
      }
    }
    this.drawShapes();
  }

  handleMouseMove(mouseX, mouseY) {
    if (!this.mousePressed) return;
    if (this.selectedResizePoint > -1) {
      this.selectedShape.resize(this.selectedResizePoint, mouseX, mouseY);
    } else if (this.selectedShape) {
      this.selectedShape.move(
        mouseX,
        mouseY,
        this.draggingOffsetX,
        this.draggingOffsetY,
      );
    }
    this.drawShapes();
  }

  handleMouseUp(mouseX, mouseY) {
    this.mousePressed = false;
  }

  handleKeyDown(key) {
    if (!this.selectedShape) return;
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
        if (this.selectedShape.lineWidth < 30.0) {
          this.selectedShape.lineWidth += 1;
        }
        break;
      case "-":
        if (this.selectedShape.lineWidth > 1.0) {
          this.selectedShape.lineWidth -= 1;
        }
        break;
      case "ArrowLeft":
        this.selectedShape.moveLeft();
        break;
      case "ArrowRight":
        this.selectedShape.moveRight();
        break;
      case "ArrowUp":
        if (this.shiftPressed) {
          this.selectedShape.grow();
        } else {
          this.selectedShape.moveUp();
        }
        break;
      case "ArrowDown":
        if (this.shiftPressed) {
          this.selectedShape.shrink();
        } else {
          this.selectedShape.moveDown();
        }
        break;
      case "Shift":
        this.shiftPressed = true;
        break;
    }
    this.drawShapes();
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

    if (this.selectedShape) {
      this.selectedShape.drawClickedOutline();
    }
  }
}
