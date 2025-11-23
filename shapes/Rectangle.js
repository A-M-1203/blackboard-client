import Shape from "./shape.js";

export default class Rectangle extends Shape {
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
  }

  draw() {
    const oldStrokeStyle = this.context.strokeStyle;
    const oldFillStyle = this.context.fillStyle;
    const oldLineWidth = this.context.lineWidth;

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    this.context.fillRect(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      this.boundingRectangle.width,
      this.boundingRectangle.height
    );
    this.context.strokeRect(
      this.boundingRectangle.points[0].x + this.lineWidth / 2,
      this.boundingRectangle.points[0].y + this.lineWidth / 2,
      this.boundingRectangle.width - this.lineWidth,
      this.boundingRectangle.height - this.lineWidth
    );

    this.context.closePath();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(context, x, y, width, height, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.strokeRect(x, y, width, height);
    context.closePath();
  }
}
