import Shape from "./shape.js";
import { DEFAULT_FILL_COLOR } from "../appContext.js";

export default class FreeLine extends Shape {
  constructor(
    startX,
    startY,
    endX,
    endY,
    context,
    strokeColor,
    lineWidth,
    coordinates,
  ) {
    super(
      startX,
      startY,
      endX,
      endY,
      context,
      strokeColor,
      DEFAULT_FILL_COLOR,
      lineWidth,
    );
    this.coordinates = coordinates;
  }

  draw() {
    const oldStrokeStyle = this.context.strokeStyle;
    const oldFillStyle = this.context.fillStyle;
    const oldLineWidth = this.context.lineWidth;

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();

    const startX = this.boundingRectangle.points[0].x + this.coordinates[0].x;
    const startY = this.boundingRectangle.points[0].y + this.coordinates[0].y;
    this.context.moveTo(startX, startY);
    for (const coordinate of this.coordinates) {
      const x = this.boundingRectangle.points[0].x + coordinate.x;
      const y = this.boundingRectangle.points[0].y + coordinate.y;
      this.context.lineTo(x, y);
      this.context.stroke();
    }

    this.context.closePath();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }
}
