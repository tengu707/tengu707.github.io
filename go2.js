var canvasSize = document.getElementById("canvasSize").value;
var boardSize = document.getElementById("boardSize").value;
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
function start() {
  var canvasSize = document.getElementById("canvasSize").value;
  var boardSize = document.getElementById("boardSize").value;
  background();
}
