import Shape from "./shape.js";

const CORNER_RADIUS = 20;

export default class RoundRectangle extends Shape {
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

    this.context.roundRect(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      this.boundingRectangle.width,
      this.boundingRectangle.height,
      CORNER_RADIUS
    );
    this.context.fill();

    this.context.roundRect(
      this.boundingRectangle.points[0].x + this.lineWidth / 2,
      this.boundingRectangle.points[0].y + this.lineWidth / 2,
      this.boundingRectangle.width - this.lineWidth,
      this.boundingRectangle.height - this.lineWidth,
      CORNER_RADIUS
    );

    this.context.stroke();

    this.context.closePath();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, shapePreview) {
    context.putImageData(shapePreview, 0, 0);

    context.beginPath();
    context.roundRect(
      startX,
      startY,
      endX - startX,
      endY - startY,
      CORNER_RADIUS
    );
    context.closePath();
    context.stroke();
  }
}
