import Shape from "./shape.js";

export default class FatArrowLeft extends Shape {
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
  }

  draw() {
    const oldStrokeStyle = this.context.strokeStyle;
    const oldFillStyle = this.context.fillStyle;
    const oldLineWidth = this.context.lineWidth;

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    if (this.endX < this.startX) {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y + this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[0].y + this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y + this.boundingRectangle.height / 2
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[2].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[2].y - this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[2].y - this.boundingRectangle.height / 4
      );
    } else {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y + this.boundingRectangle.height / 2
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[0].y + this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y + this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[2].y - this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[2].y - this.boundingRectangle.height / 4
      );
      this.context.lineTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
        this.boundingRectangle.points[2].y
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
    const boundingRectangleWidth = endX - startX;
    const boundingRectangleHeight = endY - startY;
    context.beginPath();

    context.moveTo(startX, startY + boundingRectangleHeight / 2);
    context.lineTo(startX + boundingRectangleWidth / 2, startY);
    context.lineTo(
      startX + boundingRectangleWidth / 2,
      startY + boundingRectangleHeight / 4
    );
    context.lineTo(endX, startY + boundingRectangleHeight / 4);
    context.lineTo(endX, endY - boundingRectangleHeight / 4);
    context.lineTo(
      startX + boundingRectangleWidth / 2,
      endY - boundingRectangleHeight / 4
    );
    context.lineTo(startX + boundingRectangleWidth / 2, endY);

    context.closePath();
    context.stroke();
  }
}
