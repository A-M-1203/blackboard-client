export default class BrushTool {
  constructor(context, strokeColor, lineWidth, shapes) {
    this.context = context;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.shapes = shapes;
    this.mousePressed = false;
  }

  activate() {
    this.context.strokeStyle = this.strokeColor;
    this.context.lineWidth = this.lineWidth;
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
    }
  }

  handleMouseUp(mouseX, mouseY) {
    this.mousePressed = false;
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
