import Shape from "./shape.js";

export default class Oval extends Shape {
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
    this.context.ellipse(
      this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
      this.boundingRectangle.points[0].y + this.boundingRectangle.height / 2,
      this.boundingRectangle.width / 2 - this.lineWidth / 2,
      this.boundingRectangle.height / 2 - this.lineWidth / 2,
      0,
      0,
      2 * Math.PI
    );

    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, shapePreview) {
    context.putImageData(shapePreview, 0, 0);

    const boundingRectangleHeight = endY - startY;
    const boundingRectangleWidth = endX - startX;
    context.beginPath();
    context.ellipse(
      startX + boundingRectangleWidth / 2,
      startY + boundingRectangleHeight / 2,
      Math.abs(boundingRectangleWidth / 2),
      Math.abs(boundingRectangleHeight / 2),
      Math.PI,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.closePath();
  }
}

class Circle extends Shape {
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
    this.context.arc(
      this.boundingRectangle.points[0].x +
        this.boundingRectangle.width / 2 +
        this.lineWidth / 2,
      this.boundingRectangle.points[0].y +
        this.boundingRectangle.height / 2 +
        this.lineWidth / 2,
      this.boundingRectangle.width / 2 - this.lineWidth / 2,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    const boundingRectangleWidth = endX - startX;
    const boundingRectangleHeight = endY - startY;
    context.arc(
      startX + boundingRectangleWidth / 2,
      startY + boundingRectangleHeight / 2,
      boundingRectangleWidth / 2,
      0,
      2 * Math.PI
    );
    context.stroke();
    context.closePath();
  }
}
