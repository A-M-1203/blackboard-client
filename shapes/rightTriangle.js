import Shape from "./shape.js";

export default class RightTriangle extends Shape {
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
    this.endX = endX;
    this.startY = startY;
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

    if (this.endY < this.startY && this.endX < this.startX) {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[2].x,
        this.boundingRectangle.points[2].y
      );
    } else if (this.endY < this.startY) {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[3].x,
        this.boundingRectangle.points[3].y
      );
    } else if (this.endX < this.startX) {
      this.context.moveTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[2].x,
        this.boundingRectangle.points[2].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[3].x,
        this.boundingRectangle.points[3].y
      );
    } else {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[2].x,
        this.boundingRectangle.points[2].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[3].x,
        this.boundingRectangle.points[3].y
      );
    }

    this.context.fill();
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, shapePreview) {
    context.putImageData(shapePreview, 0, 0);
    context.beginPath();

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(startX, endY);

    context.closePath();
    context.stroke();
  }
}
