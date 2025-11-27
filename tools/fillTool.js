export default class FillTool {
  constructor(context, fillColor) {
    this.context = context;
    this.fillColor = fillColor;
    this.shapes = undefined;
  }

  activate(shapes) {
    this.context.fillStyle = this.fillColor;
    this.shapes = shapes;
    return this;
  }

  handleMousePress(mouseX, mouseY) {
    for (const shape of this.shapes) {
      if (shape.isClicked(mouseX, mouseY)) {
        shape.fillColor = this.context.fillStyle;
        this.drawShapes();
      }
    }
  }

  handleMouseMove(mouseX, mouseY) {}
  handleMouseRelease(mouseX, mouseY) {}

  handleKeyPress(key) {
    switch (key) {
      case "r":
        this.context.fillStyle = this.fillColor = "#ff0000";
        break;
      case "g":
        this.context.fillStyle = this.fillColor = "#00ff00";
        break;
      case "b":
        this.context.fillStyle = this.fillColor = "#0000ff";
        break;
      case "w":
        this.context.fillStyle = this.fillColor = "#ffffff";
        break;
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
