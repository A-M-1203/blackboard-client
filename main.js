const canvas = document.getElementById("canvas");
import state from "./state.js";
import { Rectangle, Circle, EquilateralTriangle, Line } from "./shapes.js";

if (canvas.getContext) {
  // canvas is supported - rendering code

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  context.strokeStyle = "#ffffff";
  context.lineWidth = state.pencilLineWidth;
  window.onkeydown = (event) => {
    switch (event.key) {
      case "r":
        context.strokeStyle = "#ff0000";
        break;
      case "g":
        context.strokeStyle = "#00ff00";
        break;
      case "b":
        context.strokeStyle = "#0000ff";
        break;
      case "w":
        context.strokeStyle = "#ffffff";
        break;
      case "+":
        if (state.pencilSelected && state.pencilLineWidth < 248.0) {
          state.pencilLineWidth += 1.0;
          context.lineWidth = state.pencilLineWidth;
        } else if (state.brushSelected && state.brushLineWidth < 248.0) {
          state.brushLineWidth += 1.0;
          context.lineWidth = state.brushLineWidth;
        } else if (state.shapeLineWidth < 20.0) {
          state.shapeLineWidth += 1.0;
          context.lineWidth = state.shapeLineWidth;
        }
        break;
      case "-":
        if (state.pencilSelected && state.pencilLineWidth > 1.0) {
          state.pencilLineWidth -= 1.0;
        } else if (state.brushSelected && state.brushLineWidth > 1.0) {
          state.brushLineWidth -= 1.0;
        } else if (state.shapeLineWidth > 1.0) {
          state.shapeLineWidth -= 1.0;
        }
        break;
      case "P":
        state.pencilSelected = true;
        state.brushSelected = false;
        state.rectangleSelected = false;
        state.circleSelected = false;
        state.equilateralTriangleSelected = false;
        context.lineWidth = state.pencilLineWidth;
        console.log(`Pencil line width: ${context.lineWidth}`);
        break;
      case "B":
        state.brushSelected = true;
        state.pencilSelected = false;
        state.rectangleSelected = false;
        state.circleSelected = false;
        state.equilateralTriangleSelected = false;
        context.lineWidth = state.brushLineWidth;
        console.log(`Brush line width: ${context.lineWidth}`);
        break;
      case "L":
        state.lineSelected = true;
        state.pencilSelected = false;
        state.brushSelected = false;
        state.rectangleSelected = false;
        state.circleSelected = false;
        state.equilateralTriangleSelected = false;
        context.lineWidth = state.shapeLineWidth;
        console.log(`Shape line width: ${context.lineWidth}`);
        break;
      case "R":
        state.rectangleSelected = true;
        state.pencilSelected = false;
        state.brushSelected = false;
        state.circleSelected = false;
        state.equilateralTriangleSelected = false;
        context.lineWidth = state.shapeLineWidth;
        console.log(`Shape line width: ${context.lineWidth}`);
        break;
      case "C":
        state.circleSelected = true;
        state.pencilSelected = false;
        state.brushSelected = false;
        state.rectangleSelected = false;
        state.equilateralTriangleSelected = false;
        context.lineWidth = state.shapeLineWidth;
        console.log(`Shape line width: ${context.lineWidth}`);
        break;
      case "T":
        state.equilateralTriangleSelected = true;
        state.pencilSelected = false;
        state.brushSelected = false;
        state.rectangleSelected = false;
        state.circleSelected = false;
        context.lineWidth = state.shapeLineWidth;
        console.log(`Shape line width: ${context.lineWidth}`);
        break;
    }
  };

  canvas.onmousemove = (event) => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;

    if (state.mouseClicked) {
      if (state.rectangleSelected) {
        const width = event.clientX - state.shapeStartX;
        const height = event.clientY - state.shapeStartY;

        Rectangle.drawPreview(
          context,
          state.shapeStartX,
          state.shapeStartY,
          width,
          height,
          state
        );
      } else if (state.circleSelected) {
        const radius = Math.sqrt(
          (event.clientX - state.shapeStartX) *
            (event.clientX - state.shapeStartX) +
            (event.clientY - state.shapeStartY) *
              (event.clientY - state.shapeStartY)
        );

        Circle.drawPreview(
          context,
          state.shapeStartX,
          state.shapeStartY,
          radius,
          state
        );
      } else if (state.equilateralTriangleSelected) {
        const centroidRadius = Math.sqrt(
          (event.clientX - state.shapeStartX) *
            (event.clientX - state.shapeStartX) +
            (event.clientY - state.shapeStartY) *
              (event.clientY - state.shapeStartY)
        );

        EquilateralTriangle.drawPreview(
          context,
          state.shapeStartX,
          state.shapeStartY,
          centroidRadius,
          state
        );
      } else if (state.lineSelected) {
        Line.drawPreview(
          context,
          state.shapeStartX,
          state.shapeStartY,
          event.clientX,
          event.clientY,
          state
        );
      } else {
        // pencil or brush selected
        context.lineTo(event.clientX, event.clientY);
        context.stroke();
      }
    }
  };

  canvas.onmousedown = (event) => {
    state.mouseClicked = true;
    if (
      state.lineSelected ||
      state.rectangleSelected ||
      state.circleSelected ||
      state.equilateralTriangleSelected
    ) {
      state.shapeStartX = event.clientX;
      state.shapeStartY = event.clientY;
      state.contextImageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
    // for drawing with pen
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
  };

  canvas.onmouseup = (event) => {
    state.mouseClicked = false;
    if (state.rectangleSelected) {
      const width = event.clientX - state.shapeStartX;
      const height = event.clientY - state.shapeStartY;

      const rectangle = new Rectangle(
        context,
        state.shapeStartX,
        state.shapeStartY,
        width,
        height,
        context.strokeStyle,
        context.fillStyle,
        context.lineWidth
      );

      rectangle.draw();
      state.shapes.push(rectangle);
      console.log(state.shapes);
    } else if (state.circleSelected) {
      const radius = Math.sqrt(
        (event.clientX - state.shapeStartX) *
          (event.clientX - state.shapeStartX) +
          (event.clientY - state.shapeStartY) *
            (event.clientY - state.shapeStartY)
      );

      const circle = new Circle(
        context,
        state.shapeStartX,
        state.shapeStartY,
        radius,
        context.strokeStyle,
        context.fillStyle,
        context.lineWidth
      );

      circle.draw();
      state.shapes.push(circle);
      console.log(state.shapes);
    } else if (state.equilateralTriangleSelected) {
      const centroidRadius = Math.sqrt(
        (event.clientX - state.shapeStartX) *
          (event.clientX - state.shapeStartX) +
          (event.clientY - state.shapeStartY) *
            (event.clientY - state.shapeStartY)
      );

      const triangle = new EquilateralTriangle(
        context,
        state.shapeStartX,
        state.shapeStartY,
        centroidRadius,
        context.strokeStyle,
        context.fillStyle,
        context.lineWidth
      );

      triangle.draw();
      state.shapes.push(triangle);
      console.log(state.shapes);
    } else if (state.lineSelected) {
      const line = new Line(
        context,
        state.shapeStartX,
        state.shapeStartY,
        event.clientX,
        event.clientY,
        context.strokeStyle,
        context.fillStyle,
        context.lineWidth
      );

      line.draw();
      state.shapes.push(line);
      console.log(state.shapes);
    }
  };
} else {
  // canvas is not supported
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
