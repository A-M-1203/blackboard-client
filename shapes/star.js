import Shape from "./shape.js";

export default class Star extends Shape {
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
    this.startY = startY;
    this.endY = endY;
  }

  draw() {
    const oldStrokeStyle = this.context.strokeStyle;
    const oldFillStyle = this.context.fillStyle;
    const oldLineWidth = this.context.lineWidth;

    this.context.beginPath();
    this.context.moveTo(
      this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
      this.boundingRectangle.points[0].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[1].x - this.boundingRectangle.width / 3,
      this.boundingRectangle.points[1].y + this.boundingRectangle.height / 3
    );
    this.context.lineTo(
      this.boundingRectangle.points[1].x,
      this.boundingRectangle.points[1].y + this.boundingRectangle.height / 3
    );
    this.context.lineTo(
      this.boundingRectangle.points[1].x - this.boundingRectangle.width / 6,
      this.boundingRectangle.points[2].y - this.boundingRectangle.height / 3
    );
    this.context.lineTo(
      this.boundingRectangle.points[2].x,
      this.boundingRectangle.points[2].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
      this.boundingRectangle.points[2].y - this.boundingRectangle.height / 5
    );
    this.context.lineTo(
      this.boundingRectangle.points[3].x,
      this.boundingRectangle.points[3].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[3].x + this.boundingRectangle.width / 6,
      this.boundingRectangle.points[3].y - this.boundingRectangle.height / 3
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y + this.boundingRectangle.height / 3
    );
    this.context.lineTo(
      this.boundingRectangle.points[0].x + this.boundingRectangle.width / 3,
      this.boundingRectangle.points[0].y + this.boundingRectangle.height / 3
    );
    this.context.fill();
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, state) {
    context.putImageData(state.contextImageData, 0, 0);
    const boundingRectangleWidth = endX - startX;
    const boundingRectangleHeight = endY - startY;
    context.beginPath();

    context.moveTo(startX + boundingRectangleWidth / 2, startY);
    context.lineTo(
      endX - boundingRectangleWidth / 3,
      startY + boundingRectangleHeight / 3
    );
    context.lineTo(endX, startY + boundingRectangleHeight / 3);
    context.lineTo(
      endX - boundingRectangleWidth / 4,
      endY - boundingRectangleHeight / 3
    );
    context.lineTo(endX, endY);
    context.lineTo(
      endX - boundingRectangleWidth / 2,
      endY - boundingRectangleHeight / 4
    );
    context.lineTo(startX, endY);
    context.lineTo(
      startX + boundingRectangleWidth / 4,
      endY - boundingRectangleHeight / 3
    );
    context.lineTo(startX, startY + boundingRectangleHeight / 3);
    context.lineTo(
      startX + boundingRectangleWidth / 3,
      startY + boundingRectangleHeight / 3
    );

    context.closePath();
    context.stroke();
  }
}
