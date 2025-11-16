class State {
  constructor() {
    this.context = undefined;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.backgroundColor = "#141414";
    this.pencilLineWidth = 1.0;
    this.brushLineWidth = 1.0;
    this.shapeLineWidth = 1.0;
    this.eraserSize = 10;
    this.mouseDown = false;
    this.draggingShape = undefined;
    this.draggingOffsetX = undefined;
    this.draggingOffsetY = undefined;
    this.handSelected = false;
    this.pencilSelected = true;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.lineSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;

    // starting coordinates for drawing shapes (line, rectangle, circle...)
    this.shapeStartX = 0;
    this.shapeStartY = 0;
    this.contextImageData = undefined;
    // all rendered shapes on the canvas
    this.shapes = [];
    // all paths on the canvas (used for undo/redo)
    this.paths = [];
  }

  selectPencil() {
    this.pencilSelected = true;
    this.handSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.pencilLineWidth;
  }

  selectBrush() {
    this.brushSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.brushLineWidth;
  }

  selectEraser() {
    this.eraserSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
  }

  selectRectangle() {
    this.rectangleSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
  }

  selectCircle() {
    this.circleSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
  }

  selectEquilateralTriangle() {
    this.equilateralTriangleSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
  }

  selectLine() {
    this.lineSelected = true;
    this.handSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
  }

  selectHand() {
    this.handSelected = true;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
  }
}

const state = new State();
export default state;
