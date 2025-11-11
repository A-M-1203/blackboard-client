const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  // canvas is supported - rendering code

  const state = {
    mouseX: 0,
    mouseY: 0,
    pencilLineWidth: 1.0,
    brushLineWidth: 1.0,
    shapeLineWidth: 1.0,
    mouseClicked: false,
    pencilSelected: true,
    brushSelected: false,
    rectangleSelected: false,
    circleSelected: false,
    equilateralTriangleSelected: false,

    // starting coordinates for drawing shapes (rectangle, circle...)
    shapeStartX: 0,
    shapeStartY: 0,
    contextImageData: null,
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  context.strokeStyle = "rgb(255 255 255)";
  context.lineWidth = state.pencilLineWidth;
  window.onkeydown = (event) => {
    switch (event.key) {
      case "r":
        context.strokeStyle = "rgb(255 0 0)";
        break;
      case "g":
        context.strokeStyle = "rgb(0 255 0)";
        break;
      case "b":
        context.strokeStyle = "rgb(0 0 255)";
        break;
      case "w":
        context.strokeStyle = "rgb(255 255 255)";
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
        context.putImageData(state.contextImageData, 0, 0);

        const rectWidth = state.mouseX - state.shapeStartX;
        const rectHeight = state.mouseY - state.shapeStartY;
        context.strokeRect(
          state.shapeStartX,
          state.shapeStartY,
          rectWidth,
          rectHeight
        );
      } else if (state.circleSelected) {
        context.putImageData(state.contextImageData, 0, 0);

        const circleRadius = Math.sqrt(
          (state.mouseX - state.shapeStartX) *
            (state.mouseX - state.shapeStartX) +
            (state.mouseY - state.shapeStartY) *
              (state.mouseY - state.shapeStartY)
        );
        context.beginPath();
        context.arc(
          state.shapeStartX,
          state.shapeStartY,
          circleRadius,
          0,
          2 * Math.PI
        );
        context.stroke();
      } else if (state.equilateralTriangleSelected) {
        context.putImageData(state.contextImageData, 0, 0);

        const centroidCircleRadius = Math.sqrt(
          (state.mouseX - state.shapeStartX) *
            (state.mouseX - state.shapeStartX) +
            (state.mouseY - state.shapeStartY) *
              (state.mouseY - state.shapeStartY)
        );

        const cx = state.shapeStartX;
        const cy = state.shapeStartY - centroidCircleRadius;

        const ax =
          state.shapeStartX +
          (cx - state.shapeStartX) * Math.cos(120 * (Math.PI / 180)) -
          (cy - state.shapeStartY) * Math.sin(120 * (Math.PI / 180));
        const ay =
          state.shapeStartY +
          (cx - state.shapeStartX) * Math.sin(120 * (Math.PI / 180)) +
          (cy - state.shapeStartY) * Math.cos(120 * (Math.PI / 180));

        const bx =
          state.shapeStartX +
          (cx - state.shapeStartX) * Math.cos(240 * (Math.PI / 180)) -
          (cy - state.shapeStartY) * Math.sin(240 * (Math.PI / 180));
        const by =
          state.shapeStartY +
          (cx - state.shapeStartX) * Math.sin(240 * (Math.PI / 180)) +
          (cy - state.shapeStartY) * Math.cos(240 * (Math.PI / 180));

        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(ax, ay);
        context.lineTo(bx, by);
        context.lineTo(cx, cy);
        context.stroke();
      } else {
        // pencil or brush selected
        context.lineTo(state.mouseX, state.mouseY);
        context.stroke();
      }
    }
  };

  canvas.onmousedown = (event) => {
    state.mouseClicked = true;
    if (
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
    context.beginPath();
    context.moveTo(state.mouseX, state.mouseY);
  };

  canvas.onmouseup = (e) => {
    state.mouseClicked = false;
    if (state.rectangleSelected) {
      const rectWidth = state.mouseX - state.shapeStartX;
      const rectHeight = state.mouseY - state.shapeStartY;

      context.beginPath();
      context.strokeRect(
        state.shapeStartX,
        state.shapeStartY,
        rectWidth,
        rectHeight
      );
    } else if (state.circleSelected) {
      const circleRadius = Math.sqrt(
        (state.mouseX - state.shapeStartX) *
          (state.mouseX - state.shapeStartX) +
          (state.mouseY - state.shapeStartY) *
            (state.mouseY - state.shapeStartY)
      );

      context.beginPath();
      context.arc(
        state.shapeStartX,
        state.shapeStartY,
        circleRadius,
        0,
        2 * Math.PI
      );
      context.stroke();
    } else if (state.equilateralTriangleSelected) {
      const centroidCircleRadius = Math.sqrt(
        (state.mouseX - state.shapeStartX) *
          (state.mouseX - state.shapeStartX) +
          (state.mouseY - state.shapeStartY) *
            (state.mouseY - state.shapeStartY)
      );

      const cx = state.shapeStartX;
      const cy = state.shapeStartY - centroidCircleRadius;

      const ax =
        state.shapeStartX +
        (cx - state.shapeStartX) * Math.cos(120 * (Math.PI / 180)) -
        (cy - state.shapeStartY) * Math.sin(120 * (Math.PI / 180));
      const ay =
        state.shapeStartY +
        (cx - state.shapeStartX) * Math.sin(120 * (Math.PI / 180)) +
        (cy - state.shapeStartY) * Math.cos(120 * (Math.PI / 180));

      const bx =
        state.shapeStartX +
        (cx - state.shapeStartX) * Math.cos(240 * (Math.PI / 180)) -
        (cy - state.shapeStartY) * Math.sin(240 * (Math.PI / 180));
      const by =
        state.shapeStartY +
        (cx - state.shapeStartX) * Math.sin(240 * (Math.PI / 180)) +
        (cy - state.shapeStartY) * Math.cos(240 * (Math.PI / 180));

      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(ax, ay);
      context.lineTo(bx, by);
      context.lineTo(cx, cy);
      context.stroke();
    }
  };
} else {
  // canvas is not supported
  const body = document.querySelector("body");
  body.textContent = "Canvas not supported";
  console.error("Canvas is not supported");
}
