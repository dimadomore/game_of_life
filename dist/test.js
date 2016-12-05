'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var Grid = function () {
  function Grid() {
    var scaleCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Grid.getDefaultScaleCell();

    _classCallCheck(this, Grid);

    this.scaleCell = scaleCell;
    this.rows = parseInt(1000 / scaleCell);
    this.cols = parseInt(700 / scaleCell);
    this.grid = [];
    this.gridCopy = [];
    console.log("Class Grid successfully created");
  }

  _createClass(Grid, [{
    key: 'generate',
    value: function generate() {
      for (var x = 0; x < this.rows; x++) {
        this.grid[x] = [];
        this.gridCopy[x] = [];
        for (var y = 0; y < this.cols; y++) {
          this.grid[x][y] = 0;
          this.gridCopy[x][y] = 0;
        }
      }
    }
  }, {
    key: 'seed',
    value: function seed() {
      var cellsCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Grid.getDefaultCellsCount();

      this.cellsCount = cellsCount;
      for (var i = 0; i < this.cellsCount; i++) {
        this.grid[getRandomNumber(0, this.rows)][getRandomNumber(0, this.cols)] = 1;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          if (this.grid[i][j]) {
            context.fillStyle = 'black';
            context.fillRect(i * this.scaleCell, j * this.scaleCell, this.scaleCell, this.scaleCell);
          }
        }
      }
    }
  }, {
    key: 'getNextState',
    value: function getNextState() {
      for (var j = 1; j < this.rows - 1; j++) {
        for (var k = 1; k < this.cols - 1; k++) {
          var totalCells = 0;
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

      for (var _j = 1; _j < this.rows - 1; _j++) {
        for (var _k = 1; _k < this.cols - 1; _k++) {
          this.grid[_j][_k] = this.gridCopy[_j][_k];
        }
      }
    }
  }], [{
    key: 'getDefaultScaleCell',
    value: function getDefaultScaleCell() {
      return 3;
    }
  }, {
    key: 'getDefaultCellsCount',
    value: function getDefaultCellsCount() {
      return 50000;
    }
  }]);

  return Grid;
}();

var Game = function () {
  function Game() {
    var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Game.getDefaultFps();

    _classCallCheck(this, Game);

    this.grid = new Grid();
    this.grid.generate();
    this.grid.seed();
    this.grid.draw();
    this.requestAnimFrame = function () {
      return requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
      };
    }();
    console.log("Success");
  }

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      this.requestAnimFrame(this.render());
    }
  }, {
    key: 'render',
    value: function render() {
      clearCanvas();
      this.grid.getNextState();
      this.grid.draw();
    }
  }], [{
    key: 'getDefaultFps',
    value: function getDefaultFps() {
      return 60;
    }
  }]);

  return Game;
}();

var g = new Game();
g.play();