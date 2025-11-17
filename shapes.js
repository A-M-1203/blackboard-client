class Shape {
  constructor(context, x, y, strokeColor, fillColor, lineWidth) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
  }
}

export class Rectangle extends Shape {
  constructor(context, x, y, width, height, strokeColor, fillColor, lineWidth) {
    super(context, x, y, strokeColor, fillColor, lineWidth);
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.save();

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    this.context.closePath();

    this.context.restore();
  }

  static drawPreview(context, x, y, width, height, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.strokeRect(x, y, width, height);
    context.closePath();
  }

  clicked(x, y) {
    const top = this.y;
    const bottom = this.height + this.y;
    const left = this.x;
    const right = this.width + this.x;

    if (x > left && x < right && y > top && y < bottom) {
      return true;
    }

    return false;
  }
}

export class Circle extends Shape {
  constructor(context, x, y, radius, strokeColor, fillColor, lineWidth) {
    super(context, x, y, strokeColor, fillColor, lineWidth);
    this.radius = radius;
  }

  draw() {
    this.context.save();

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    this.context.restore();
  }

  static drawPreview(context, x, y, radius, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
  }

  clicked(x, y) {
    const distance = Math.sqrt(
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y)
    );

    if (distance < this.radius) {
      return true;
    }

    return false;
  }
}

export class EquilateralTriangle extends Shape {
  constructor(
    context,
    x,
    y,
    centroidRadius,
    strokeColor,
    fillColor,
    lineWidth
  ) {
    super(context, x, y, strokeColor, fillColor, lineWidth);
    this.centroidRadius = centroidRadius;
  }

  draw() {
    this.context.save();

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    const cx = this.x;
    const cy = this.y - this.centroidRadius;

    const ax =
      this.x +
      (cx - this.x) * Math.cos(120 * (Math.PI / 180)) -
      (cy - this.y) * Math.sin(120 * (Math.PI / 180));
    const ay =
      this.y +
      (cx - this.x) * Math.sin(120 * (Math.PI / 180)) +
      (cy - this.y) * Math.cos(120 * (Math.PI / 180));

    const bx =
      this.x +
      (cx - this.x) * Math.cos(240 * (Math.PI / 180)) -
      (cy - this.y) * Math.sin(240 * (Math.PI / 180));
    const by =
      this.y +
      (cx - this.x) * Math.sin(240 * (Math.PI / 180)) +
      (cy - this.y) * Math.cos(240 * (Math.PI / 180));

    this.context.beginPath();
    this.context.moveTo(cx, cy);
    this.context.lineTo(ax, ay);
    this.context.lineTo(bx, by);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();

    this.context.restore();
  }

  static drawPreview(context, x, y, centroidRadius, state) {
    const cx = x;
    const cy = y - centroidRadius;

    const ax =
      x +
      (cx - x) * Math.cos(120 * (Math.PI / 180)) -
      (cy - y) * Math.sin(120 * (Math.PI / 180));
    const ay =
      y +
      (cx - x) * Math.sin(120 * (Math.PI / 180)) +
      (cy - y) * Math.cos(120 * (Math.PI / 180));

    const bx =
      x +
      (cx - x) * Math.cos(240 * (Math.PI / 180)) -
      (cy - y) * Math.sin(240 * (Math.PI / 180));
    const by =
      y +
      (cx - x) * Math.sin(240 * (Math.PI / 180)) +
      (cy - y) * Math.cos(240 * (Math.PI / 180));

    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(ax, ay);
    context.lineTo(bx, by);
    context.closePath();
    context.stroke();
  }

  clicked(x, y) {
    const distance = Math.sqrt(
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y)
    );

    if (distance < this.centroidRadius) {
      return true;
    }

    return false;
  }
}

export class Line extends Shape {
  constructor(context, x, y, endX, endY, strokeColor, fillColor, lineWidth) {
    super(context, x, y, strokeColor, fillColor, lineWidth);
    this.endX = endX;
    this.endY = endY;
  }

  draw() {
    this.context.save();

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;

    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.endX, this, this.endY);
    this.context.stroke();
    this.context.closePath();

    this.context.restore();
  }

  static drawPreview(context, x, y, endX, endY, state) {
    context.putImageData(state.contextImageData, 0, 0);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
  }

  clicked() {}
}
