class BoundingRectangle {
  constructor(startX, startY, endX, endY) {
    // in clockwise order
    this.points = [];
    this.width = undefined;
    this.height = undefined;
    if (startX < endX && startY > endY) {
      this.points.push(
        { x: startX, y: endY },
        { x: endX, y: endY },
        { x: endX, y: startY },
        { x: startX, y: startY }
      );
      this.width = endX - startX;
      this.height = startY - endY;
    } else if (startX > endX && startY > endY) {
      this.points.push(
        { x: endX, y: endY },
        { x: startX, y: endY },
        { x: startX, y: startY },
        { x: endX, y: startY }
      );
      this.width = startX - endX;
      this.height = startY - endY;
    } else if (startX > endX && startY < endY) {
      this.points.push(
        { x: endX, y: startY },
        { x: startX, y: startY },
        { x: startX, y: endY },
        { x: endX, y: endY }
      );
      this.width = startX - endX;
      this.height = endY - startY;
    } else {
      this.points.push(
        { x: startX, y: startY },
        { x: endX, y: startY },
        { x: endX, y: endY },
        { x: startX, y: endY }
      );
      this.width = endX - startX;
      this.height = endY - startY;
    }
  }

  isClicked(clickX, clickY) {
    if (
      clickX > this.points[0].x &&
      clickX < this.points[1].x &&
      clickY > this.points[0].y &&
      clickY < this.points[3].y
    ) {
      return true;
    }

    return false;
  }
}

class Shape {
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
    const oldStrokeStyle = this.context.strokeStyle;
    const oldLineWidth = this.context.lineWidth;
    this.context.lineWidth = 3.0;
    this.context.strokeStyle = outlineColor;
    this.context.setLineDash([5, 3]);
    this.context.strokeRect(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      this.boundingRectangle.width,
      this.boundingRectangle.height
    );
    this.context.setLineDash([]);

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

    // resize point n
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

export class Rectangle extends Shape {
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
    this.context.fillRect(
      this.boundingRectangle.points[0].x,
      this.boundingRectangle.points[0].y,
      this.boundingRectangle.width,
      this.boundingRectangle.height
    );
    this.context.strokeRect(
      this.boundingRectangle.points[0].x + this.lineWidth / 2,
      this.boundingRectangle.points[0].y + this.lineWidth / 2,
      this.boundingRectangle.width - this.lineWidth,
      this.boundingRectangle.height - this.lineWidth
    );

    this.context.closePath();
    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(context, x, y, width, height, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.strokeRect(x, y, width, height);
    context.closePath();
  }
}

export class Circle extends Shape {
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

export class Ellipse extends Shape {
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

  static drawPreview(startX, startY, endX, endY, context, state) {
    context.putImageData(state.contextImageData, 0, 0);

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

export class Triangle extends Shape {
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

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    if (this.endY < this.startY) {
      this.context.moveTo(
        this.boundingRectangle.points[0].x,
        this.boundingRectangle.points[0].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[1].x,
        this.boundingRectangle.points[1].y
      );
      this.context.lineTo(
        this.boundingRectangle.points[2].x - this.boundingRectangle.width / 2,
        this.boundingRectangle.points[2].y
      );
    } else {
      this.context.beginPath();
      this.context.moveTo(
        this.boundingRectangle.points[0].x + this.boundingRectangle.width / 2,
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

  static drawPreview(startX, startY, endX, endY, context, state) {
    context.putImageData(state.contextImageData, 0, 0);
    const boundingRectangleWidth = endX - startX;
    const boundingRectangleHeight = endY - startY;
    context.beginPath();

    context.moveTo(startX + boundingRectangleWidth / 2, startY);
    context.lineTo(endX, endY);
    context.lineTo(startX, startY + boundingRectangleHeight);

    context.closePath();
    context.stroke();
  }
}

export class Line extends Shape {
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
    this.startY = startY;
    this.endX = endX;
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
    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
    this.context.closePath();

    this.context.strokeStyle = oldStrokeStyle;
    this.context.fillStyle = oldFillStyle;
    this.context.lineWidth = oldLineWidth;
  }

  static drawPreview(context, x, y, endX, endY, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
  }
}
