class State {
  constructor() {
    this.context = undefined;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.pencilColor = "#ffffff";
    this.brushColor = "#ffffff";
    this.strokeColor = "#ffffff";
    this.fillColor = "#000000";
    this.clickedOutlineColor = "#ffffff";
    this.pencilLineWidth = 1.0;
    this.brushLineWidth = 1.0;
    this.shapeLineWidth = 1.0;
    this.eraserSize = 10;
    this.mouseDown = false;
    this.selectedShape = undefined;
    this.prevSelectedShape = undefined;
    this.draggingShape = undefined;
    this.draggingOffsetX = undefined;
    this.draggingOffsetY = undefined;
    this.selectSelected = false;
    this.pencilSelected = true;
    this.fillSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.lineSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;

    // starting coordinates for drawing shapes (line, rectangle, circle...)
    this.shapeStartX = 0;
    this.shapeStartY = 0;
    this.shapeSelectImageData = undefined;
    this.contextImageData = undefined;
    // all rendered shapes on the canvas
    this.shapes = [];
    // all paths on the canvas (used for undo/redo)
    this.paths = [];
  }

  redrawCanvas() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    this.shapes.forEach((shape) => shape.draw());

    if (this.selectedShape) {
      this.selectedShape.drawClickedOutline();
    }
  }

  shapeSelected() {
    if (
      this.lineSelected ||
      this.rectangleSelected ||
      this.circleSelected ||
      this.equilateralTriangleSelected
    ) {
      return true;
    }

    return false;
  }

  setColor(color) {
    if (this.pencilSelected) {
      this.context.strokeStyle = this.pencilColor = color;
      console.log("------------------------------------------------");
      console.log(`Pencil color set to: ${this.context.strokeStyle}`);
      console.log("------------------------------------------------");
    } else if (this.brushSelected) {
      this.context.strokeStyle = this.brushColor = color;
      console.log("------------------------------------------------");
      console.log(`Brush color set to: ${this.context.strokeStyle}`);
      console.log("------------------------------------------------");
    } else if (this.fillSelected) {
      this.context.fillStyle = this.fillColor = color;
      console.log("------------------------------------------------");
      console.log(`Fill color set to: ${this.context.fillStyle}`);
      console.log("------------------------------------------------");
    } else if (this.shapeSelected()) {
      this.context.strokeStyle = this.strokeColor = color;
      this.context.fillStyle = this.fillColor;
      console.log("------------------------------------------------");
      console.log(`Shape line color set to: ${this.context.strokeStyle}`);
      console.log("------------------------------------------------");
    }
  }

  incrementLineWidth() {
    if (state.pencilSelected && state.pencilLineWidth < 248.0) {
      state.context.lineWidth = state.pencilLineWidth += 1.0;
      console.log("------------------------------------------------");
      console.log(`Pencil line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    } else if (state.brushSelected && state.brushLineWidth < 248.0) {
      state.context.lineWidth = state.brushLineWidth += 1.0;
      console.log("------------------------------------------------");
      console.log(`Brush line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    } else if (state.shapeSelected() && state.shapeLineWidth < 20.0) {
      state.context.lineWidth = state.shapeLineWidth += 1.0;
      console.log("------------------------------------------------");
      console.log(`Shape line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    }
  }

  decrementLineWidth() {
    if (state.pencilSelected && state.pencilLineWidth > 1.0) {
      state.context.lineWidth = state.pencilLineWidth -= 1.0;
      console.log("------------------------------------------------");
      console.log(`Pencil line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    } else if (state.brushSelected && state.brushLineWidth > 1.0) {
      state.context.lineWidth = state.brushLineWidth -= 1.0;
      console.log("------------------------------------------------");
      console.log(`Brush line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    } else if (state.shapeSelected() && state.shapeLineWidth > 1.0) {
      state.context.lineWidth = state.shapeLineWidth -= 1.0;
      console.log("------------------------------------------------");
      console.log(`Shape line width is: ${this.context.lineWidth}`);
      console.log("------------------------------------------------");
    }
  }

  selectSelect() {
    this.selectSelected = true;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    console.log("------------------------------------------------");
    console.log("Select selected");
    console.log("------------------------------------------------");
  }

  selectPencil() {
    this.pencilSelected = true;
    this.selectSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.pencilLineWidth;
    this.context.strokeStyle = this.pencilColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Pencil selected");
    console.log(`Pencil line width: ${this.context.lineWidth}`);
    console.log(`Pencil color: ${this.context.strokeStyle}`);
    console.log("------------------------------------------------");
  }

  selectBrush() {
    this.brushSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.brushLineWidth;
    this.context.strokeStyle = this.brushColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Brush selected");
    console.log(`Brush line width: ${this.context.lineWidth}`);
    console.log(`Brush color: ${this.context.strokeStyle}`);
    console.log("------------------------------------------------");
  }

  selectFill() {
    this.fillSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.fillStyle = this.fillColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Fill selected");
    console.log(`Fill color: ${this.context.fillStyle}`);
    console.log("------------------------------------------------");
  }

  selectRectangle() {
    this.rectangleSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
    this.context.strokeStyle = this.strokeColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Rectangle selected");
    console.log(`Rectangle line width: ${this.context.lineWidth}`);
    console.log(`Rectangle line color width: ${this.context.strokeStyle}`);
    console.log(`Rectangle fill color: ${this.context.fillStyle}`);
    console.log("------------------------------------------------");
  }

  selectCircle() {
    this.circleSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.equilateralTriangleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
    this.context.strokeStyle = this.strokeColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Circle selected");
    console.log(`Circle line width: ${this.context.lineWidth}`);
    console.log(`Circle line color width: ${this.context.strokeStyle}`);
    console.log(`Circle fill color: ${this.context.fillStyle}`);
    console.log("------------------------------------------------");
  }

  selectEquilateralTriangle() {
    this.equilateralTriangleSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.lineSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
    this.context.strokeStyle = this.strokeColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Triangle selected");
    console.log(`Triangle line width: ${this.context.lineWidth}`);
    console.log(`Triangle line color width: ${this.context.strokeStyle}`);
    console.log(`Triangle fill color: ${this.context.fillStyle}`);
    console.log("------------------------------------------------");
  }

  selectLine() {
    this.lineSelected = true;
    this.selectSelected = false;
    this.pencilSelected = false;
    this.brushSelected = false;
    this.fillSelected = false;
    this.eraserSelected = false;
    this.rectangleSelected = false;
    this.circleSelected = false;
    this.equilateralTriangleSelected = false;
    this.context.lineWidth = this.shapeLineWidth;
    this.context.strokeStyle = this.strokeColor;
    this.selectedShape = undefined;
    console.log("------------------------------------------------");
    console.log("Line selected");
    console.log(`Line line width: ${this.context.lineWidth}`);
    console.log(`Line line color width: ${this.context.strokeStyle}`);
    console.log("------------------------------------------------");
  }
}

const state = new State();
export default state;
