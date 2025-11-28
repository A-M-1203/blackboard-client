import Rectangle from "../shapes/Rectangle.js";
import Oval from "../shapes/Oval.js";
import Triangle from "../shapes/Triangle.js";
import Diamond from "../shapes/diamond.js";
import FourPointStar from "../shapes/fourPointStar.js";
import FivePointStar from "../shapes/fivePointStar.js";
import RoundRectangle from "../shapes/roundRectangle.js";
import RightTriangle from "../shapes/rightTriangle.js";

export default class ShapeTool {
  constructor(
    context,
    strokeColor,
    fillColor,
    lineWidth,
    canvasWidth,
    canvasHeight
  ) {
    this.context = context;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.selectedShape = undefined;
    this.shapeStartX = undefined;
    this.shapeStartY = undefined;
    this.shapePreview = undefined;
    this.shapes = undefined;
    this.mousePressed = false;
    this.shiftPressed = false;
  }

  activate(key, shapes) {
    this.selectedShape = key;
    this.shapes = shapes;
    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle = this.fillColor;
    this.context.lineWidth = this.lineWidth;
    return this;
  }

  handleMousePress(mouseX, mouseY) {
    this.mousePressed = true;
    this.shapeStartX = mouseX;
    this.shapeStartY = mouseY;
    this.shapePreview = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  handleMouseMove(mouseX, mouseY) {
    if (this.mousePressed) {
      if (this.shiftPressed) {
        mouseX = mouseY - this.shapeStartY + this.shapeStartX;
      }

      switch (this.selectedShape) {
        case "R":
          Rectangle.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "O":
          Oval.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "T":
          Triangle.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "D":
          Diamond.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "Q":
          FourPointStar.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "A":
          FivePointStar.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "X":
          RoundRectangle.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
          break;
        case "Z":
          RightTriangle.drawPreview(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.shapePreview
          );
      }
    }
  }

  handleMouseRelease(mouseX, mouseY) {
    this.mousePressed = false;
    if (this.shiftPressed) {
      mouseX = mouseY - this.shapeStartY + this.shapeStartX;
    }

    switch (this.selectedShape) {
      case "R":
        this.shapes.push(
          new Rectangle(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "O":
        this.shapes.push(
          new Oval(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "T":
        this.shapes.push(
          new Triangle(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "D":
        this.shapes.push(
          new Diamond(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "Q":
        this.shapes.push(
          new FourPointStar(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "A":
        this.shapes.push(
          new FivePointStar(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "X":
        this.shapes.push(
          new RoundRectangle(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
        break;
      case "Z":
        this.shapes.push(
          new RightTriangle(
            this.shapeStartX,
            this.shapeStartY,
            mouseX,
            mouseY,
            this.context,
            this.strokeColor,
            this.fillColor,
            this.lineWidth
          )
        );
    }
    this.drawShapes();
  }

  handleKeyPress(key) {
    switch (key) {
      case "+":
        if (this.lineWidth < 100.0) {
          this.context.lineWidth = this.lineWidth += 1;
        }
        break;
      case "-":
        if (this.lineWidth > 1.0) {
          this.context.lineWidth = this.lineWidth -= 1;
        }
        break;
      case "r":
        this.context.strokeStyle = this.strokeColor = "#ff0000";
        break;
      case "g":
        this.context.strokeStyle = this.strokeColor = "#00ff00";
        break;
      case "b":
        this.context.strokeStyle = this.strokeColor = "#0000ff";
        break;
      case "w":
        this.context.strokeStyle = this.strokeColor = "#ffffff";
        break;
      case "Shift":
        this.shiftPressed = true;
        break;
    }
  }

  handleKeyRelease(key) {
    switch (key) {
      case "Shift":
        this.shiftPressed = false;
        break;
    }
  }

  drawShapes() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    this.shapes.forEach((shape) => shape.draw());
  }
}
