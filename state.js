class State {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.backgroundColor = "#141414";
    this.pencilLineWidth = 1.0;
    this.brushLineWidth = 1.0;
    this.shapeLineWidth = 1.0;
    this.mouseClicked = false;
    this.pencilSelected = true;
    this.brushSelected = false;
    this.lineSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;

    // starting coordinates for drawing shapes (line, rectangle, circle...)
    this.shapeStartX = 0;
    this.shapeStartY = 0;
    this.contextImageData = null;
    // all rendered shapes on the canvas
    this.shapes = [];
    // all paths on the canvas (used for undo/redo)
    this.paths = [];
  }
}

const state = new State();
export default state;
