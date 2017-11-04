//basic functions
var c = document.getElementById("chessBoard");
var ctx = c.getContext("2d");
var fill = "#000000";

//A function that draws lines
function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//A function that draws circles
function circle(centerX, centerY, diameter) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, diameter/2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
}

//A function that draws rectangles
function rectangle(x1, y1, width, height) {
  ctx.beginPath();
  ctx.rect(x1, y1, width, height);
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
}
//Define variables
var canvasSize = document.getElementById("canvasSize").value;
var boardSize = 8;

//Draw the board
function background() {
  //Define rectangle size
  var rectSize = canvasSize / boardSize;
  //Create checkerboard
  fill = "#888888";
  for (var i = 0; i < boardSize; i++) {
    if (fill ==="#ffffff") {
      fill = "#888888";
    }
    else {
      fill = "#ffffff";
    }
    for (var j = 0; j < boardSize; j++) {
      if (fill ==="#ffffff") {
        fill = "#888888";
      }
      else {
        fill = "#ffffff";
      }
      ctx.strokeStyle = fill;
      rectangle(i * rectSize, j * rectSize, rectSize, rectSize);
    }
  }
}

function showCoords(event) {
    var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var mouseX = event.clientX - document.getElementById("chessBoard").offsetLeft + scrollLeft;
    var mouseY = event.clientY - document.getElementById("chessBoard").offsetTop + scrollTop;
}

function start() {
  canvasSize = document.getElementById("canvasSize").value;
  document.getElementById("chessBoard").width = canvasSize;
  document.getElementById("chessBoard").height = canvasSize;
  background();
}
