import Shape from "./shape.js";

export default class FourPointStar extends Shape {
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
    this.context.moveTo(
      this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
      this.boundingRectangle.points[0].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x +
        this.boundingRectangle.width / 2 +
        this.boundingRectangle.width / 8,
      this.boundingRectangle.points[1].y +
        this.boundingRectangle.height / 2 -
        this.boundingRectangle.height / 8
    );
    this.context.lineTo(
      this.boundingRectangle.points[1].x,
      this.boundingRectangle.points[1].y + this.boundingRectangle.height / 2
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x +
        this.boundingRectangle.width / 2 +
        this.boundingRectangle.width / 8,
      this.boundingRectangle.points[1].y +
        this.boundingRectangle.height / 2 +
        this.boundingRectangle.height / 8
    );
    this.context.lineTo(
      this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
      this.boundingRectangle.points[2].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x +
        this.boundingRectangle.width / 2 -
        this.boundingRectangle.width / 8,
      this.boundingRectangle.points[1].y +
        this.boundingRectangle.height / 2 +
        this.boundingRectangle.height / 8
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y + this.boundingRectangle.height / 2
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x +
        this.boundingRectangle.width / 2 -
        this.boundingRectangle.width / 8,
      this.boundingRectangle.points[1].y +
        this.boundingRectangle.height / 2 -
        this.boundingRectangle.height / 8
    );

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

    context.moveTo(startX + boundingRectangleWidth / 2, startY);
    context.lineTo(
      startX + boundingRectangleWidth / 2 + boundingRectangleWidth / 8,
      endY -
        boundingRectangleHeight +
        boundingRectangleHeight / 2 -
        boundingRectangleHeight / 8
    );
    context.lineTo(
      startX + boundingRectangleWidth,
      endY - boundingRectangleHeight + boundingRectangleHeight / 2
    );
    context.lineTo(
      startX + boundingRectangleWidth / 2 + boundingRectangleWidth / 8,
      endY -
        boundingRectangleHeight +
        boundingRectangleHeight / 2 +
        boundingRectangleHeight / 8
    );
    context.lineTo(endX - boundingRectangleWidth / 2, endY);
    context.lineTo(
      startX + boundingRectangleWidth / 2 - boundingRectangleWidth / 8,
      endY -
        boundingRectangleHeight +
        boundingRectangleHeight / 2 +
        boundingRectangleHeight / 8
    );
    context.lineTo(startX, startY + boundingRectangleHeight / 2);
    context.lineTo(
      startX + boundingRectangleWidth / 2 - boundingRectangleWidth / 8,
      endY -
        boundingRectangleHeight +
        boundingRectangleHeight / 2 -
        boundingRectangleHeight / 8
    );

    context.closePath();
    context.stroke();
  }
}
