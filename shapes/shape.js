import BoundingRectangle from "./boundingRectangle.js";

export default class Shape {
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
    this.boundingRectangle = new BoundingRectangle(startX, startY, endX, endY);
    this.context = context;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
  }

  isClicked(clickX, clickY) {
    return this.boundingRectangle.isClicked(clickX, clickY);
  }

  drawClickedOutline(outlineColor) {
    const oldFillStyle = this.context.fillStyle;
    const oldStrokeStyle = this.context.strokeStyle;
    const oldLineWidth = this.context.lineWidth;
    this.context.strokeStyle = outlineColor;
    this.context.lineWidth = 3.0;
    this.context.setLineDash([5, 3]);
    this.context.strokeRect(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      this.boundingRectangle.width,
      this.boundingRectangle.height
    );
    this.context.setLineDash([]);

    this.context.fillStyle = "#000000";
    this.context.lineWidth = 1.0;

    // resize point 0
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 1
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
      this.boundingRectangle.points[0].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 2
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[1].x,
      this.boundingRectangle.points[1].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 3
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[1].x,
      this.boundingRectangle.points[1].y + this.boundingRectangle.height / 2,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 4
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[2].x,
      this.boundingRectangle.points[2].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 5
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
      this.boundingRectangle.points[2].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 6
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[3].x,
      this.boundingRectangle.points[3].y,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point 7
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[3].x,
      this.boundingRectangle.points[3].y - this.boundingRectangle.height / 2,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    this.context.fillStyle = oldFillStyle;
    this.context.strokeStyle = oldStrokeStyle;
    this.context.lineWidth = oldLineWidth;
  }

  resize(resizePoint, endX, endY) {
    switch (resizePoint) {
      case 0:
        if (
          endY < this.boundingRectangle.points[2].y - 10 &&
          endX < this.boundingRectangle.points[2].x - 10
        ) {
          this.boundingRectangle.points[0].x = endX;
          this.boundingRectangle.points[0].y = endY;
          this.boundingRectangle.points[1].y = endY;
          this.boundingRectangle.points[3].x = endX;

          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;

          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 1:
        if (endY < this.boundingRectangle.points[3].y - 10) {
          this.boundingRectangle.points[0].y = endY;
          this.boundingRectangle.points[1].y = endY;
          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 2:
        if (
          endY < this.boundingRectangle.points[2].y - 10 &&
          endX > this.boundingRectangle.points[0].x + 10
        ) {
          this.boundingRectangle.points[1].x = endX;
          this.boundingRectangle.points[1].y = endY;
          this.boundingRectangle.points[0].y = endY;
          this.boundingRectangle.points[2].x = endX;

          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;

          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 3:
        if (endX > this.boundingRectangle.points[0].x + 10) {
          this.boundingRectangle.points[1].x = endX;
          this.boundingRectangle.points[2].x = endX;
          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;
        }
        break;
      case 4:
        if (
          endY > this.boundingRectangle.points[0].y + 10 &&
          endX > this.boundingRectangle.points[0].x + 10
        ) {
          this.boundingRectangle.points[2].x = endX;
          this.boundingRectangle.points[2].y = endY;
          this.boundingRectangle.points[1].x = endX;
          this.boundingRectangle.points[3].y = endY;

          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;

          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 5:
        if (endY > this.boundingRectangle.points[0].y + 10) {
          this.boundingRectangle.points[2].y = endY;
          this.boundingRectangle.points[3].y = endY;
          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 6:
        if (
          endY > this.boundingRectangle.points[0].y + 10 &&
          endX < this.boundingRectangle.points[1].x - 10
        ) {
          this.boundingRectangle.points[3].x = endX;
          this.boundingRectangle.points[3].y = endY;
          this.boundingRectangle.points[0].x = endX;
          this.boundingRectangle.points[2].y = endY;

          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;

          this.boundingRectangle.height =
            this.boundingRectangle.points[3].y -
            this.boundingRectangle.points[0].y;
        }
        break;
      case 7:
        if (endX < this.boundingRectangle.points[1].x - 10) {
          this.boundingRectangle.points[3].x = endX;
          this.boundingRectangle.points[0].x = endX;
          this.boundingRectangle.width =
            this.boundingRectangle.points[1].x -
            this.boundingRectangle.points[0].x;
        }
        break;
    }
  }

  isResizePointClicked(clickX, clickY) {
    const radius = 9;

    // resize point 0
    let deltaX = clickX - this.boundingRectangle.points[0].x;
    let deltaY = clickY - this.boundingRectangle.points[0].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 0;
    }

    // resize point 1
    deltaX =
      clickX -
      (this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2);
    deltaY = clickY - this.boundingRectangle.points[0].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 1;
    }

    // resize point 2
    deltaX = clickX - this.boundingRectangle.points[1].x;
    deltaY = clickY - this.boundingRectangle.points[1].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 2;
    }

    // resize point 3
    deltaX = clickX - this.boundingRectangle.points[1].x;
    deltaY =
      clickY -
      (this.boundingRectangle.points[1].y + this.boundingRectangle.height / 2);
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 3;
    }

    // resize point 4
    deltaX = clickX - this.boundingRectangle.points[2].x;
    deltaY = clickY - this.boundingRectangle.points[2].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 4;
    }

    // resize point 5
    deltaX =
      clickX -
      (this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2);
    deltaY = clickY - this.boundingRectangle.points[2].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 5;
    }

    // resize point 6
    deltaX = clickX - this.boundingRectangle.points[3].x;
    deltaY = clickY - this.boundingRectangle.points[3].y;
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 6;
    }

    // resize point 7
    deltaX = clickX - this.boundingRectangle.points[3].x;
    deltaY =
      clickY -
      (this.boundingRectangle.points[3].y - this.boundingRectangle.height / 2);
    if (deltaX * deltaX + deltaY * deltaY <= radius * radius) {
      return 7;
    }

    return -1;
  }
}
