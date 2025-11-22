const canvas = document.getElementById("canvas");
import state from "./state.js";
import { Rectangle, Circle, Ellipse, Triangle, Line } from "./shapes.js";

if (canvas.getContext) {
  // canvas is supported - rendering code

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  state.context = context;

  state.context.strokeStyle = "#ffffff";
  state.context.lineWidth = state.pencilLineWidth;
  window.onkeydown = (event) => {
    switch (event.key) {
      case "r":
        state.setColor("#ff0000");
        break;
      case "g":
        state.setColor("#00ff00");
        break;
      case "b":
        state.setColor("#0000ff");
        break;
      case "w":
        state.setColor("#ffffff");
        break;
      case "+":
        state.incrementLineWidth();
        break;
      case "-":
        state.decrementLineWidth();
        break;
      case "S":
        state.selectSelect();
        break;
      case "P":
        state.selectPencil();
        break;
      case "B":
        state.selectBrush();
        break;
      case "F":
        state.selectFill();
        break;
      case "R":
        state.selectRectangle();
        break;
      case "C":
        state.selectCircle();
        break;
      case "T":
        state.selectEquilateralTriangle();
        break;
      case "L":
        state.selectLine();
        break;
    }
  };

  canvas.onmousedown = (event) => {
    state.mouseDown = true;
    if (state.selectSelected) {
      state.selectedShape = undefined;
      for (const shape of state.shapes) {
        if (shape.isClicked(event.x, event.y)) {
          state.selectedShape = shape;
          state.draggingShape = shape;
          state.draggingOffsetX = event.x - shape.boundingRectangle.points[0].x;
          state.draggingOffsetY = event.y - shape.boundingRectangle.points[0].y;
          break;
        }
      }

      state.redrawCanvas();
    } else if (state.pencilSelected || state.brushSelected) {
      state.context.beginPath();
      state.context.moveTo(event.x, event.y);
    } else if (state.fillSelected) {
      for (const shape of state.shapes) {
        if (shape.isClicked(event.x, event.y)) {
          shape.fillColor = state.context.fillStyle;
        }
        shape.draw();
      }
    } else if (
      state.lineSelected ||
      state.rectangleSelected ||
      state.circleSelected ||
      state.equilateralTriangleSelected
    ) {
      state.shapeStartX = event.x;
      state.shapeStartY = event.y;
      state.contextImageData = state.context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  };

  canvas.onmousemove = (event) => {
    state.mouseX = event.x;
    state.mouseY = event.y;

    if (state.mouseDown) {
      if (state.selectSelected && state.draggingShape) {
        state.draggingShape.boundingRectangle.points[0].x =
          event.x - state.draggingOffsetX;
        state.draggingShape.boundingRectangle.points[0].y =
          event.y - state.draggingOffsetY;

        state.draggingShape.boundingRectangle.points[1].x =
          state.draggingShape.boundingRectangle.points[0].x +
          state.draggingShape.boundingRectangle.width;
        state.draggingShape.boundingRectangle.points[1].y =
          state.draggingShape.boundingRectangle.points[0].y;

        state.draggingShape.boundingRectangle.points[2].x =
          state.draggingShape.boundingRectangle.points[1].x;
        state.draggingShape.boundingRectangle.points[2].y =
          state.draggingShape.boundingRectangle.points[1].y +
          state.draggingShape.boundingRectangle.height;

        state.draggingShape.boundingRectangle.points[3].x =
          state.draggingShape.boundingRectangle.points[0].x;
        state.draggingShape.boundingRectangle.points[3].y =
          state.draggingShape.boundingRectangle.points[2].y;

        state.redrawCanvas();
      } else if (state.pencilSelected || state.brushSelected) {
        state.context.lineTo(event.x, event.y);
        state.context.stroke();
      } else if (state.rectangleSelected) {
        const width = event.x - state.shapeStartX;
        const height = event.y - state.shapeStartY;

        Rectangle.drawPreview(
          state.context,
          state.shapeStartX,
          state.shapeStartY,
          width,
          height,
          state
        );
      } else if (state.circleSelected) {
        Ellipse.drawPreview(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state
        );
      } else if (state.equilateralTriangleSelected) {
        Triangle.drawPreview(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state
        );
      } else if (state.lineSelected) {
        Line.drawPreview(
          state.context,
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state
        );
      }
    }
  };

  canvas.onmouseup = (event) => {
    state.draggingShape = undefined;
    state.mouseDown = false;

    if (state.rectangleSelected) {
      state.shapes.push(
        new Rectangle(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state.context.strokeStyle,
          state.context.fillStyle,
          state.context.lineWidth
        )
      );
      state.selectedShape = state.shapes[state.shapes.length - 1];
      state.redrawCanvas();
      // console.log(state.shapes);
    } else if (state.circleSelected) {
      state.shapes.push(
        new Ellipse(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state.context.strokeStyle,
          state.context.fillStyle,
          state.context.lineWidth
        )
      );
      state.selectedShape = state.shapes[state.shapes.length - 1];
      state.redrawCanvas();
      // console.log(state.shapes);
    } else if (state.equilateralTriangleSelected) {
      state.shapes.push(
        new Triangle(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state.context.strokeStyle,
          state.context.fillStyle,
          state.context.lineWidth
        )
      );
      state.selectedShape = state.shapes[state.shapes.length - 1];
      state.redrawCanvas();
      // console.log(state.shapes);
    } else if (state.lineSelected) {
      state.shapes.push(
        new Line(
          state.shapeStartX,
          state.shapeStartY,
          event.x,
          event.y,
          state.context,
          state.context.strokeStyle,
          state.context.fillStyle,
          state.context.lineWidth
        )
      );
      state.selectedShape = state.shapes[state.shapes.length - 1];
      state.redrawCanvas();
      // console.log(state.shapes);
    }
  };
} else {
  // canvas is not supported
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
