const canvas = document.getElementById("canvas");
import state from "./state.js";
import { Rectangle, Circle, EquilateralTriangle, Line } from "./shapes.js";

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
        state.context.strokeStyle = "#ff0000";
        break;
      case "g":
        state.context.strokeStyle = "#00ff00";
        break;
      case "b":
        state.context.strokeStyle = "#0000ff";
        break;
      case "w":
        state.context.strokeStyle = "#ffffff";
        break;
      case "+":
        if (state.pencilSelected && state.pencilLineWidth < 248.0) {
          state.pencilLineWidth += 1.0;
          state.context.lineWidth = state.pencilLineWidth;
        } else if (state.brushSelected && state.brushLineWidth < 248.0) {
          state.brushLineWidth += 1.0;
          state.context.lineWidth = state.brushLineWidth;
        } else if (state.eraserSelected && state.eraserSize < 50) {
          state.eraserSize += 5;
        } else if (state.shapeLineWidth < 20.0) {
          state.shapeLineWidth += 1.0;
          state.context.lineWidth = state.shapeLineWidth;
        }
        break;
      case "-":
        if (state.pencilSelected && state.pencilLineWidth > 1.0) {
          state.pencilLineWidth -= 1.0;
        } else if (state.brushSelected && state.brushLineWidth > 1.0) {
          state.brushLineWidth -= 1.0;
        } else if (state.eraserSelected && state.eraserSize > 0) {
          state.eraserSize -= 5;
        } else if (state.shapeLineWidth > 1.0) {
          state.shapeLineWidth -= 1.0;
        }
        break;
      case "H":
        state.selectHand();
        console.log("Hand selected");
        break;
      case "P":
        state.selectPencil();
        console.log(`Pencil line width: ${state.context.lineWidth}`);
        break;
      case "B":
        state.selectBrush();
        console.log(`Brush line width: ${state.context.lineWidth}`);
        break;
      case "E":
        state.selectEraser();
        console.log(`Eraser size: ${state.eraserSize}`);
        break;
      case "R":
        state.selectRectangle();
        console.log(`Shape line width: ${state.context.lineWidth}`);
        break;
      case "C":
        state.selectCircle();
        console.log(`Shape line width: ${state.context.lineWidth}`);
        break;
      case "T":
        state.selectEquilateralTriangle();
        console.log(`Shape line width: ${state.context.lineWidth}`);
        break;
      case "L":
        state.selectLine();
        console.log(`Shape line width: ${state.context.lineWidth}`);
        break;
    }
  };

  canvas.onmousedown = (event) => {
    state.mouseDown = true;
    if (state.handSelected) {
      for (const shape of state.shapes) {
        if (shape.clicked(event.x, event.y)) {
          state.draggingShape = shape;
          state.draggingOffsetX = event.x - shape.x;
          state.draggingOffsetY = event.y - shape.y;
          break;
        }
      }
    } else if (state.pencilSelected || state.brushSelected) {
      state.context.beginPath();
      state.context.moveTo(event.x, event.y);
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
      if (state.handSelected && state.draggingShape) {
        state.draggingShape.x = event.x - state.draggingOffsetX;
        state.draggingShape.y = event.y - state.draggingOffsetY;

        state.context.clearRect(0, 0, canvas.width, canvas.height);
        state.shapes.forEach((shape) => shape.draw());
      } else if (state.pencilSelected || state.brushSelected) {
        state.context.lineTo(event.x, event.y);
        state.context.stroke();
      } else if (state.eraserSelected) {
        state.context.clearRect(
          event.x - state.eraserSize,
          event.y - state.eraserSize,
          state.eraserSize,
          state.eraserSize
        );
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
        const radius = Math.sqrt(
          (event.x - state.shapeStartX) * (event.x - state.shapeStartX) +
            (event.y - state.shapeStartY) * (event.y - state.shapeStartY)
        );

        Circle.drawPreview(
          state.context,
          state.shapeStartX,
          state.shapeStartY,
          radius,
          state
        );
      } else if (state.equilateralTriangleSelected) {
        const centroidRadius = Math.sqrt(
          (event.x - state.shapeStartX) * (event.x - state.shapeStartX) +
            (event.y - state.shapeStartY) * (event.y - state.shapeStartY)
        );

        EquilateralTriangle.drawPreview(
          state.context,
          state.shapeStartX,
          state.shapeStartY,
          centroidRadius,
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
      const width = event.x - state.shapeStartX;
      const height = event.y - state.shapeStartY;

      const rectangle = new Rectangle(
        state.context,
        state.shapeStartX,
        state.shapeStartY,
        width,
        height,
        state.context.strokeStyle,
        state.context.fillStyle,
        state.context.lineWidth
      );

      rectangle.draw();
      state.shapes.push(rectangle);
      // console.log(state.shapes);
    } else if (state.circleSelected) {
      const radius = Math.sqrt(
        (event.x - state.shapeStartX) * (event.x - state.shapeStartX) +
          (event.y - state.shapeStartY) * (event.y - state.shapeStartY)
      );

      const circle = new Circle(
        state.context,
        state.shapeStartX,
        state.shapeStartY,
        radius,
        state.context.strokeStyle,
        state.context.fillStyle,
        state.context.lineWidth
      );

      circle.draw();
      state.shapes.push(circle);
      // console.log(state.shapes);
    } else if (state.equilateralTriangleSelected) {
      const centroidRadius = Math.sqrt(
        (event.x - state.shapeStartX) * (event.x - state.shapeStartX) +
          (event.y - state.shapeStartY) * (event.y - state.shapeStartY)
      );

      const triangle = new EquilateralTriangle(
        state.context,
        state.shapeStartX,
        state.shapeStartY,
        centroidRadius,
        state.context.strokeStyle,
        state.context.fillStyle,
        state.context.lineWidth
      );

      triangle.draw();
      state.shapes.push(triangle);
      // console.log(state.shapes);
    } else if (state.lineSelected) {
      const line = new Line(
        state.context,
        state.shapeStartX,
        state.shapeStartY,
        event.x,
        event.y,
        state.context.strokeStyle,
        state.context.fillStyle,
        state.context.lineWidth
      );

      line.draw();
      state.shapes.push(line);
      // console.log(state.shapes);
    }
  };
} else {
  // canvas is not supported
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
