import SelectTool from "./tools/selectTool.js";
import HandTool from "./tools/handTool.js";
import PencilTool from "./tools/pencilTool.js";
import EraseTool from "./tools/eraseTool.js";
import BrushTool from "./tools/brushTool.js";
import FillTool from "./tools/fillTool.js";
import RectangleTool from "./tools/rectangleTool.js";
import OvalTool from "./tools/ovalTool.js";
import RoundRectangleTool from "./tools/roundRectangleTool.js";
import TriangleTool from "./tools/triangleTool.js";
import RightTriangleTool from "./tools/rightTriangleTool.js";
import DiamondTool from "./tools/diamondTool.js";

export default class AppState {
  constructor(context) {
    this.context = context;
    this.tools = [];
    this.shapes = [];

    this.BACKGROUND_COLOR = "#212020";
    this.STROKE_COLOR = "#ffffff";
    this.FILL_COLOR = this.BACKGROUND_COLOR;
    this.LINE_WIDTH = 1.0;
    this.context.strokeStyle = "#ffffff";
    this.context.fillStyle = "#212020";
    this.context.lineWidth = 1.0;

    this.selectTool = new SelectTool(this.context, this.shapes);
    this.handTool = new HandTool(this.context, this.shapes);
    this.pencilTool = new PencilTool(
      this.context,
      this.STROKE_COLOR,
      this.LINE_WIDTH,
      this.shapes,
    );
    this.eraseTool = new EraseTool(this.context);
    this.brushTool = new BrushTool(
      this.context,
      this.STROKE_COLOR,
      this.LINE_WIDTH,
      this.shapes,
    );
    this.fillTool = new FillTool(this.context, this.FILL_COLOR, this.shapes);

    this.selectedTool = this.selectTool;

    this.rectangleTool = new RectangleTool(this.context, this.shapes);
    this.roundRectangleTool = new RoundRectangleTool(this.context, this.shapes);
    this.ovalTool = new OvalTool(this.context, this.shapes);
    this.triangleTool = new TriangleTool(this.context, this.shapes);
    this.rightTriangleTool = new RightTriangleTool(this.context, this.shapes);
    this.diamondTool = new DiamondTool(this.context, this.shapes);
  }

  addMouseEventListeners(
    canvas,
    tools,
    fillColors,
    strokeColors,
    lineWidthSlider,
    lineWidthSliderLabel,
  ) {
    canvas.addEventListener("mousedown", (event) => {
      this.selectedTool.handleMouseDown(event.offsetX, event.offsetY);
    });
    canvas.addEventListener("mousemove", (event) => {
      this.selectedTool.handleMouseMove(event.offsetX, event.offsetY);
    });
    canvas.addEventListener("mouseup", (event) => {
      this.selectedTool.handleMouseUp(event.offsetX, event.offsetY);
    });

    tools[0].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.selectTool;
    });
    tools[1].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.handTool;
    });
    tools[2].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.pencilTool;
    });
    tools[3].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.eraseTool;
    });
    tools[4].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.brushTool;
    });
    tools[5].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.fillTool;
    });

    tools[6].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.roundRectangleTool;
    });
    tools[7].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.rectangleTool;
    });
    tools[8].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.ovalTool;
    });
    tools[9].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.triangleTool;
    });
    tools[10].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.rightTriangleTool;
    });
    tools[11].addEventListener("click", (event) => {
      for (let i = 0; i < tools.length; ++i) {
        tools[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.selectedTool = this.diamondTool;
    });

    fillColors[0].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#212020";
      this.selectedTool.handleKeyDown("D");
    });
    fillColors[1].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ffffff";
      this.selectedTool.handleKeyDown("W");
    });
    fillColors[2].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#008000";
      this.selectedTool.handleKeyDown("G");
    });
    fillColors[3].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#90ee90";
      this.selectedTool.handleKeyDown("[");
    });
    fillColors[4].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#0000ff";
      this.selectedTool.handleKeyDown("B");
    });
    fillColors[5].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#add8e6";
      this.selectedTool.handleKeyDown("]");
    });
    fillColors[6].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ff0000";
      this.selectedTool.handleKeyDown("R");
    });
    fillColors[7].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ffff00";
      this.selectedTool.handleKeyDown("Y");
    });
    fillColors[8].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ffa500";
      this.selectedTool.handleKeyDown("O");
    });
    fillColors[9].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#800080";
      this.selectedTool.handleKeyDown("P");
    });
    fillColors[10].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ffc0cb";
      this.selectedTool.handleKeyDown(";");
    });
    fillColors[11].addEventListener("click", (event) => {
      for (let i = 0; i < fillColors.length; ++i) {
        fillColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.fillStyle = "#ff00ff";
      this.selectedTool.handleKeyDown("M");
    });

    // STROKE COLORS EVENT LISTENERS
    strokeColors[0].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#212020";
      this.selectedTool.handleKeyDown("d");
    });
    strokeColors[1].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ffffff";
      this.selectedTool.handleKeyDown("w");
    });
    strokeColors[2].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#008000";
      this.selectedTool.handleKeyDown("g");
    });
    strokeColors[3].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#90ee90";
    });
    strokeColors[4].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#0000ff";
      this.selectedTool.handleKeyDown("b");
    });
    strokeColors[5].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#add8e6";
    });
    strokeColors[6].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ff0000";
      this.selectedTool.handleKeyDown("r");
    });
    strokeColors[7].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ffff00";
      this.selectedTool.handleKeyDown("y");
    });
    strokeColors[8].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ffa500";
      this.selectedTool.handleKeyDown("o");
    });
    strokeColors[9].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#800080";
      this.selectedTool.handleKeyDown("p");
    });
    strokeColors[10].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ffc0cb";
    });
    strokeColors[11].addEventListener("click", (event) => {
      for (let i = 0; i < strokeColors.length; ++i) {
        strokeColors[i].classList.remove("selected");
      }
      event.currentTarget.classList.add("selected");
      this.context.strokeStyle = "#ff00ff";
      this.selectedTool.handleKeyDown("m");
    });

    lineWidthSlider.addEventListener("input", (event) => {
      const oldValue = +lineWidthSliderLabel.textContent;
      const newValue = +event.target.value;
      this.context.lineWidth = newValue;
      if (newValue > oldValue) {
        for (let i = 0; i < newValue - oldValue; ++i)
          this.selectedTool.handleKeyDown("+");
      } else {
        for (let i = 0; i < oldValue - newValue; ++i)
          this.selectedTool.handleKeyDown("-");
      }
      lineWidthSliderLabel.textContent = event.target.value;
    });
  }

  addKeyboardEventListeners(
    tools,
    fillColors,
    lineWidthSlider,
    lineWidthSliderLabel,
  ) {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "S":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[0].classList.add("selected");
          this.selectedTool = this.selectTool;
          break;
        case "H":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[1].classList.add("selected");
          this.selectedTool = this.handTool;
          break;
        case "P":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[2].classList.add("selected");
          this.selectedTool = this.pencilTool;
          break;
        case "E":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[3].classList.add("selected");
          this.selectedTool = this.eraseTool;
          break;
        case "B":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[4].classList.add("selected");
          this.selectedTool = this.brushTool;
          break;
        case "F":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[5].classList.add("selected");
          this.selectedTool = this.fillTool;
          break;

        case "Q":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[6].classList.add("selected");
          this.selectedTool = this.roundRectangleTool;
          break;
        case "R":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[7].classList.add("selected");
          this.selectedTool = this.rectangleTool;
          break;
        case "O":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[8].classList.add("selected");
          this.selectedTool = this.ovalTool;
          break;
        case "T":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[9].classList.add("selected");
          this.selectedTool = this.triangleTool;
          break;
        case "Y":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[10].classList.add("selected");
          this.selectedTool = this.rightTriangleTool;
          break;
        case "D":
          for (let i = 0; i < tools.length; ++i) {
            tools[i].classList.remove("selected");
          }
          tools[11].classList.add("selected");
          this.selectedTool = this.diamondTool;
          break;

        case "d":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[0].classList.add("selected");
          this.context.fillStyle = "#212020";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "w":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[1].classList.add("selected");
          this.context.fillStyle = "#ffffff";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "g":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[2].classList.add("selected");
          this.context.fillStyle = "#008000";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "[":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[3].classList.add("selected");
          this.context.fillStyle = "#90ee90";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "b":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[4].classList.add("selected");
          this.context.fillStyle = "#0000ff";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "]":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[5].classList.add("selected");
          this.context.fillStyle = "#add8e6";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "r":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[6].classList.add("selected");
          this.context.fillStyle = "#ff0000";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "y":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[7].classList.add("selected");
          this.context.fillStyle = "#ffff00";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "o":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[8].classList.add("selected");
          this.context.fillStyle = "#ffa500";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "p":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[9].classList.add("selected");
          this.context.fillStyle = "#800080";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case ";":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[10].classList.add("selected");
          this.context.fillStyle = "#ffc0cb";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "m":
          for (let i = 0; i < fillColors.length; ++i) {
            fillColors[i].classList.remove("selected");
          }
          fillColors[11].classList.add("selected");
          this.context.fillStyle = "#ff00ff";
          this.selectedTool.handleKeyDown(event.key);
          break;
        case "+":
          {
            let value = +lineWidthSlider.value;
            value += 1;
            lineWidthSlider.value = value;
            lineWidthSliderLabel.textContent = lineWidthSlider.value;
            this.context.lineWidth = value;
            this.selectedTool.handleKeyDown(event.key);
          }
          break;
        case "-":
          {
            let value = +lineWidthSlider.value;
            value -= 1;
            lineWidthSlider.value = value;
            lineWidthSliderLabel.textContent = lineWidthSlider.value;
            this.context.lineWidth = value;
            this.selectedTool.handleKeyDown(event.key);
          }
          break;
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
        case "Shift":
          this.selectedTool.handleKeyDown(event.key);
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "Shift":
          this.selectedTool.handleKeyUp(event.key);
          break;
      }
    });
  }
}
