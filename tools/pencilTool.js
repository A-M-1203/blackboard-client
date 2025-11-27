export default class PencilTool {
  constructor(context, strokeColor, lineWidth) {
    this.context = context;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.mousePressed = false;
  }

  activate() {
    this.context.strokeStyle = this.strokeColor;
    this.context.lineWidth = this.lineWidth;
    return this;
  }

  handleMousePress(mouseX, mouseY) {
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

  handleMouseRelease(mouseX, mouseY) {
    this.mousePressed = false;
  }

  handleKeyPress(key) {
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
        this.context.strokeStyle = this.strokeColor = "#ff0000";
        break;
      case "g":
        this.context.strokeStyle = this.strokeColor = "#00ff00";
        break;
      case "b":
        this.context.strokeStyle = this.strokeColor = "#0000ff";
        break;
      case "w":
        this.context.strokeStyle = this.strokeColor = "#ffffff";
        break;
    }
  }

  handleKeyRelease(key) {}
}
