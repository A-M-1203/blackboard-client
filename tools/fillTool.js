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
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i].isClicked(mouseX, mouseY)) {
        this.shapes[i].fillColor = this.context.fillStyle;
        this.drawShapes();
        break;
      }
    }
  }

  handleMouseMove(mouseX, mouseY) {}
  handleMouseRelease(mouseX, mouseY) {}

  handleKeyPress(key) {
    switch (key) {
      case "r":
        this.context.fillStyle = this.fillColor = "#800000ff";
        break;
      case "g":
        this.context.fillStyle = this.fillColor = "#008000ff";
        break;
      case "b":
        this.context.fillStyle = this.fillColor = "#000080ff";
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
