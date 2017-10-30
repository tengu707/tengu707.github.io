//programming variables
var canvasSize = document.getElementById("canvasSize").value;
var boardSize = document.getElementById("boardSize").value;
var gridNum = boardSize - 1;
var gridSize = canvasSize - 100;
var gridX = 50;
var gridY = 50;
var turn = 1;
var remove = 0;
var button = 0;
var skipCount = 0;
var score = 0;
var scoreCount = 0;
var groupped = 0;
var a = 0;
var freedom = 0;
var capturedGroups = [];
var legal = 1;
var capture = 0;
var add = 0;
var b = 0;
var current = 0;
var groupLines = -1;
var duplicate = 0;
var storeX = 0;
var storeY = 0;
var store = 0;
var storage = [];
var start = 1;
var undos = 8;
var minus = 3;
var fill = "#000000";

//Background creating function
function background() {
  var c = document.getElementById("goboard");
  var ctx = c.getContext("2d");
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
  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvasSize,canvasSize);
}

//function to run on start or restart
function start() {
  var canvasSize = document.getElementById("canvasSize").value;
  var boardSize = document.getElementById("boardSize").value;
  background();
}
