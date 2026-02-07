export default class FillTool {
  constructor(context, fillColor, shapes) {
    this.context = context;
    this.fillColor = fillColor;
    this.shapes = shapes;
  }

  activate(shapes) {
    this.context.fillStyle = this.fillColor;
    this.shapes = shapes;
    return this;
  }

  handleMouseDown(mouseX, mouseY) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i].isClicked(mouseX, mouseY)) {
        this.shapes[i].fillColor = this.context.fillStyle;
        this.drawShapes();
        break;
      }
    }
  }

  handleMouseMove(mouseX, mouseY) {}
  handleMouseUp(mouseX, mouseY) {}

  handleKeyDown(key) {
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

  handleKeyUp(key) {}

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
