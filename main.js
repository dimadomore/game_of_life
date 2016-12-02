// function initializeCanvas() {
//   var d_canvas = document.getElementById("dima");
//   var context = d_canvas.getContext("2d");
//
//   for (var x = 0.5; x < 500; x += 10) {
//     context.moveTo(x, 0);
//     context.lineTo(x, 375);
//   }
//
//   for (var y = 0.5; y < 375; y += 10) {
//     context.moveTo(0, y);
//     context.lineTo(500, y);
//   }
//
//   context.strokeStyle = "#DFAFA5";
//   context.stroke();
//
//   context.beginPath();
//   context.moveTo(0, 40);
//   context.lineTo(240, 40);
//   context.moveTo(260, 40);
//   context.lineTo(500, 40);
//   context.moveTo(495, 35);
//   context.lineTo(500, 40);
//   context.lineTo(495, 45);
//
//   context.moveTo(60, 0);
//   context.lineTo(60, 153);
//   context.moveTo(60, 173);
//   context.lineTo(60, 375);
//   context.moveTo(65, 370);
//   context.lineTo(60, 375);
//   context.lineTo(55, 370);
//
//   context.strokeStyle = "#000";
//   context.stroke();
//
//
//   context.fillText("x", 248, 43);
//   context.fillText("y", 58, 165);
//
//   context.textBaseline = "top";
//   context.fillText("( 0 , 0 )", 8, 5);
//
//   context.textAlign = "right";
//   context.textBaseline = "bottom";
//   context.fillText("( 500 , 375 )", 492, 370);
// }


// var c = document.getElementById('dima');
// var ctx = c.getContext("2d");
// var scaleCell = 5;
// var grid = [];
// var fps = 5;
//
// var sceneWidth = ctx.width;
// var sceneHeight = ctx.height;
//
// var rows = parseInt(sceneWidth / scaleCell);
// var cols = parseInt(sceneHeight / scaleCell);
//
// for (var x = 0; x < rows; x++) {
//   grid[x] = [];
//   for (var y = 0; y < cols; y++) {
//     grid[x][y] = 0;
//   }
// }
//
// Math.floor(Math.random() * max) + min;

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var gameEngine;

var x = 10,
    y = 10;



var gameStep = (function () {
  return requestAnimationFrame ||
  webkitRequestAnimationFrame  ||
  mozRequestAnimationFrame     ||
  oRequestAnimationFrame       ||
  msRequestAnimationFrame      ;
})();

var gameEngineStart = function (callback) {
  gameEngine = callback;
  gameEngineStep();
}

var gameEngineStep = function () {
  gameEngine();
  gameStep(gameEngineStep);
}

function drawRect() {
  context.fillStyle = 'black';
  context.clearRect(0, 0, 500, 375);
  context.fillRect(x, y, 100, 100);
}

var setGameEngine = function (callback) {
  gameEngine = callback;
}

var gameLoopRight = function () {
  drawRect();
  x += 5;

  if (x > 300) {
    setGameEngine(gameLoopLeft);
  }
}

var gameLoopLeft = function () {
  drawRect();
  x -= 5;
  if (x <= 0) {
    setGameEngine(gameLoopRight);
  }
}

gameEngineStart(gameLoopRight);
