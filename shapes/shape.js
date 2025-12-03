import BoundingRectangle from "./boundingRectangle.js";

const CLICKED_OUTLINE_COLOR = "#ffffff";
const CLICKED_OUTLINE_WIDTH = 3.0;
const RESIZE_POINT_RADIUS = 5;
const MOVE_FACTOR = 5;
const GROW_FACTOR = 5;
const SHRINK_FACTOR = 5;

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

  move(mouseX, mouseY, draggingOffsetX, draggingOffsetY) {
    this.boundingRectangle.points[0].x = mouseX - draggingOffsetX;
    this.boundingRectangle.points[0].y = mouseY - draggingOffsetY;

    this.boundingRectangle.points[1].x =
      this.boundingRectangle.points[0].x + this.boundingRectangle.width;
    this.boundingRectangle.points[1].y = this.boundingRectangle.points[0].y;

    this.boundingRectangle.points[2].x = this.boundingRectangle.points[1].x;
    this.boundingRectangle.points[2].y =
      this.boundingRectangle.points[1].y + this.boundingRectangle.height;

    this.boundingRectangle.points[3].x = this.boundingRectangle.points[0].x;
    this.boundingRectangle.points[3].y = this.boundingRectangle.points[2].y;
  }

  grow() {
    this.boundingRectangle.points[0].x -= GROW_FACTOR;
    this.boundingRectangle.points[0].y -= GROW_FACTOR;

    this.boundingRectangle.points[1].x += GROW_FACTOR;
    this.boundingRectangle.points[1].y -= GROW_FACTOR;

    this.boundingRectangle.points[2].x += GROW_FACTOR;
    this.boundingRectangle.points[2].y += GROW_FACTOR;

    this.boundingRectangle.points[3].x -= GROW_FACTOR;
    this.boundingRectangle.points[3].y += GROW_FACTOR;

    this.boundingRectangle.width =
      this.boundingRectangle.points[1].x - this.boundingRectangle.points[0].x;
    this.boundingRectangle.height =
      this.boundingRectangle.points[2].y - this.boundingRectangle.points[1].y;
  }

  shrink() {
    this.boundingRectangle.points[0].x += SHRINK_FACTOR;
    this.boundingRectangle.points[0].y += SHRINK_FACTOR;

    this.boundingRectangle.points[1].x -= SHRINK_FACTOR;
    this.boundingRectangle.points[1].y += SHRINK_FACTOR;

    this.boundingRectangle.points[2].x -= SHRINK_FACTOR;
    this.boundingRectangle.points[2].y -= SHRINK_FACTOR;

    this.boundingRectangle.points[3].x += SHRINK_FACTOR;
    this.boundingRectangle.points[3].y -= SHRINK_FACTOR;

    this.boundingRectangle.width =
      this.boundingRectangle.points[1].x - this.boundingRectangle.points[0].x;
    this.boundingRectangle.height =
      this.boundingRectangle.points[2].y - this.boundingRectangle.points[1].y;
  }

  moveLeft() {
    for (const point of this.boundingRectangle.points) {
      point.x -= MOVE_FACTOR;
    }
  }

  moveRight() {
    for (const point of this.boundingRectangle.points) {
      point.x += MOVE_FACTOR;
    }
  }

  moveUp() {
    for (const point of this.boundingRectangle.points) {
      point.y -= MOVE_FACTOR;
    }
  }

  moveDown() {
    for (const point of this.boundingRectangle.points) {
      point.y += MOVE_FACTOR;
    }
  }

  drawClickedOutline() {
    const oldFillStyle = this.context.fillStyle;
    const oldStrokeStyle = this.context.strokeStyle;
    const oldLineWidth = this.context.lineWidth;
    this.context.strokeStyle = CLICKED_OUTLINE_COLOR;
    this.context.lineWidth = CLICKED_OUTLINE_WIDTH;
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
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    // resize point RESIZE_POINT_RADIUS
    this.context.beginPath();
    this.context.arc(
      this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
      this.boundingRectangle.points[2].y,
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
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
      RESIZE_POINT_RADIUS,
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
    const radius = RESIZE_POINT_RADIUS + 4;

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
