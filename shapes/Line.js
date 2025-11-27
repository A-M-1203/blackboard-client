import Shape from "./shape.js";

export default class Line extends Shape {
  constructor(
    startX,
    startY,
    endX,
    endY,
    context,
    strokeColor,
    fillColor,
    lineWidth
  ) {
    super(
      startX,
      startY,
      endX,
      endY,
      context,
      strokeColor,
      fillColor,
      lineWidth
    );
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw() {
    const oldStrokeStyle = this.context.strokeStyle;
    const oldFillStyle = this.context.fillStyle;
    const oldLineWidth = this.context.lineWidth;

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
    this.context.closePath();

    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(context, x, y, endX, endY, shapePreview) {
    context.putImageData(shapePreview, 0, 0);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
  }
}
