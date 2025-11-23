export default class BoundingRectangle {
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
