import FreeLine from "../shapes/freeLine.js";

export default class PencilTool {
  constructor(context, strokeColor, lineWidth, shapes) {
    this.context = context;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.mousePressed = false;
    this.freeLineCoordinates = [];
    this.shapes = shapes;
  }

  activate(shapes) {
    this.context.strokeStyle = this.strokeColor;
    this.context.lineWidth = this.lineWidth;
    this.freeLineCoordinates = [];
    this.shapes = shapes;
    return this;
  }

  handleMouseDown(mouseX, mouseY) {
    this.mousePressed = true;
    this.context.beginPath();
    this.context.moveTo(mouseX, mouseY);
  }

  handleMouseMove(mouseX, mouseY) {
    if (this.mousePressed) {
      this.context.lineTo(mouseX, mouseY);
      this.context.stroke();
      this.freeLineCoordinates.push({ x: mouseX, y: mouseY });
    }
  }

  handleMouseUp(mouseX, mouseY) {
    this.mousePressed = false;
    let maxX = -100000;
    let minX = 100000;
    let maxY = -100000;
    let minY = 100000;
    for (const coordinate of this.freeLineCoordinates) {
      if (coordinate.x > maxX) {
        maxX = coordinate.x;
      } else if (coordinate.x < minX) {
        minX = coordinate.x;
      }

      if (coordinate.y > maxY) {
        maxY = coordinate.y;
      } else if (coordinate.y < minY) {
        minY = coordinate.y;
      }
    }

    for (let i = 0; i < this.freeLineCoordinates.length; i++) {
      this.freeLineCoordinates[i].x -= minX;
      this.freeLineCoordinates[i].y -= minY;
    }

    this.shapes.push(
      new FreeLine(
        minX,
        minY,
        maxX,
        maxY,
        this.context,
        this.strokeColor,
        this.lineWidth,
        this.freeLineCoordinates,
      ),
    );
  }

  handleKeyDown(key) {
    switch (key) {
      case "+":
        if (this.lineWidth < 100.0) {
          this.context.lineWidth = this.lineWidth += 1;
        }
        break;
      case "-":
        if (this.lineWidth > 1.0) {
          this.context.lineWidth = this.lineWidth -= 1;
        }
        break;
      case "r":
        this.context.strokeStyle = this.strokeColor = "#800000ff";
        break;
      case "g":
        this.context.strokeStyle = this.strokeColor = "#008000ff";
        break;
      case "b":
        this.context.strokeStyle = this.strokeColor = "#000080ff";
        break;
      case "w":
        this.context.strokeStyle = this.strokeColor = "#ffffff";
        break;
    }
  }

  handleKeyUp(key) {}
}
