//basic functions
var c = document.getElementById("goboard");
var ctx = c.getContext("2d");

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
function rect(x1, y1, width, height) {
  ctx.beginPath();
  ctx.rect(x1, y1, width, height);
  ctx.stroke();
  ctx.fillStyle = fill;
  ctx.fill();
}
//Define variables
var canvasSize = document.getElementById("canvasSize").value;
var boardSize = 8;
var fill = "#000000";

//Draw the board
function background() {
  var num=0;
  // Create gradient
  var grd = ctx.createLinearGradient(0,0,canvasSize,0);
  grd.addColorStop(0,"#D68910");
  for (i = 0; i < 20; i++) {
    num = i / 20;
    grd.addColorStop(num,"#D68910");	
    grd.addColorStop(num + 0.02,"#B9770E");
    grd.addColorStop(num + 0.04,"#D68910");
  }  
  grd.addColorStop(1,"#D68910");
  // Fill background with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvasSize,canvasSize);
  
  //Define rectangle size
  var rectSize = (canvasSize - 100) / boardSize;
  //Create checkerboard
  fill = "#000000";
    for (var i = 0; i < boardSize; i++) {
      if (fill ="#ffffff") {
        fill = "#000000";
      }
      else {
        fill = "#ffffff";
      }
      for (var j = 0; j < boardSize; j++) {
        if (fill ="#ffffff") {
          fill = "#000000";
        }
        else {
          fill = "#ffffff";
        }
        strokeStyle = fill;
        rect(i * rectSize, j * rectSize, rectSize, rectSize);
      }
    }
}

function start() {
  background();
}
