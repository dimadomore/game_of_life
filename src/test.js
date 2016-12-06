var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas () {
  context.clearRect(0, 0, canvas.width, canvas.height);
}


class Grid {
  constructor(scaleCell = Grid.getDefaultScaleCell(), ) {
    this.scaleCell = scaleCell;
    this.rows = parseInt(canvas.width / scaleCell);
    this.cols = parseInt(canvas.height / scaleCell);
    this.grid = [];
    this.gridCopy = [];
  }

  generate() {
    for (let x = 0; x < this.rows; x++) {
      this.grid[x] = [];
      this.gridCopy[x] = [];
      for (let y = 0; y < this.cols; y++) {
        this.grid[x][y] = 0;
        this.gridCopy[x][y] = 0;
      }
    }
  }

  seed(cellsCount = Grid.getDefaultCellsCount()) {
    this.cellsCount = cellsCount;
    for (let i = 0; i < this.cellsCount; i++) {
      this.grid[getRandomNumber(0, this.rows)][getRandomNumber(0, this.cols)] = 1;
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j]) {
          context.fillStyle = 'black';
          context.fillRect(i * this.scaleCell, j * this.scaleCell, this.scaleCell, this.scaleCell);
        }
      }
    }
  }

  getNextState() {
    for (let j = 1; j < this.rows - 1; j++) {
      for (let k = 1; k < this.cols - 1; k++) {
          let totalCells = 0;
          totalCells += this.grid[j - 1][k - 1];
          totalCells += this.grid[j - 1][k];
          totalCells += this.grid[j - 1][k + 1];
          totalCells += this.grid[j][k - 1];
          totalCells += this.grid[j][k + 1];
          totalCells += this.grid[j + 1][k - 1];
          totalCells += this.grid[j + 1][k];
          totalCells += this.grid[j + 1][k + 1];

          if (this.grid[j][k] === 0) {
              if (totalCells == 3) {
                    this.gridCopy[j][k] = 1;
              } else {
                this.gridCopy[j][k] = 0;
              }
          } else if (this.grid[j][k] === 1) {
              if (totalCells == 3 || totalCells == 2) {
                this.gridCopy[j][k] = 1;
              } else {
                this.gridCopy[j][k] = 0;
              }
          }
      }
    }

    for (let j = 0; j < this.rows; j++) {
        for (let k = 0; k < this.cols; k++) {
            this.grid[j][k] = this.gridCopy[j][k];
        }
    }
  }

  static getDefaultScaleCell() {
    return 3;
  }

  static getDefaultCellsCount() {
    return 50000;
  }
}
class Game {
  constructor(fps = Game.getDefaultFps()) {
    this.fps = fps;
    this.grid = new Grid();
    this.grid.generate();
    this.grid.seed();
  }

  start() {
    this.grid.draw();
  }

  render() {
   setTimeout(() => {
        requestAnimationFrame(this.render.bind(this));
        clearCanvas();
        this.grid.getNextState();
        this.grid.draw();
    }, 1000 / this.fps);

  }

  static getDefaultFps() {
    return 60;
  }

}

let g = new Game();

g.start();
g.render();
