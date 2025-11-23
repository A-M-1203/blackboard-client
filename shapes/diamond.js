import Shape from "./shape.js";

export default class Diamond extends Shape {
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
      this.boundingRectangle.points[1].x,
      this.boundingRectangle.points[1].y + this.boundingRectangle.height / 2
    );
    this.context.lineTo(
      this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
      this.boundingRectangle.points[2].y
    );
    this.context.lineTo(
      this.boundingRectangle.points[3].x,
      this.boundingRectangle.points[3].y - this.boundingRectangle.height / 2
    );

    this.context.closePath();
    this.context.stroke();
    this.context.fill();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(startX, startY, endX, endY, context, state) {
    context.putImageData(state.contextImageData, 0, 0);

    const boundingRectangleHeight = endY - startY;
    const boundingRectangleWidth = endX - startX;
    context.beginPath();

    context.moveTo(startX + boundingRectangleWidth / 2, startY);
    context.lineTo(endX, startY + boundingRectangleHeight / 2);
    context.lineTo(endX - boundingRectangleWidth / 2, endY);
    context.lineTo(startX, endY - boundingRectangleHeight / 2);

    context.closePath();
    context.stroke();
  }
}
