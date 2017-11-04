//v 2.0

//Drawing variables


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

//A function that returns true if two points are a certain distance away
function dist(distance, x1, y1, x2, y2) {
    if(Math.abs(x1-x2) === distance && y1 === y2 || x1 === x2 && Math.abs(y1-y2) === distance) {
        return true;
    }
    else {
        return false;
    }
    
}

//programming variables
var canvasSize = document.getElementById("canvasSize").value;
var boardSize = document.getElementById("boardSize").value;
var numOfPlayers = 2;
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
var turnStart = 1;
var undos = 8;
var minus = 3;
var fill = "#000000";

//group color scheme
ctx.strokeStyle = "#077312";
var colors = [
    "#ff0000",
    "#ffaa00",
    "#e6ff00",
    "#00ff0d",
    "#00eeff",
    "#0000ff",
    "#ff1ee6",
    "#fa87ca",
    "#07730c",
    "#646464"
];

//data for button Size (some may be unnecessary)
var x1 = 150;
var x2 = 250;
var y1 = 10;
var y2 = 40;

//for determining mouse position
var mouseGridX = 0;
var mouseGridY = 0;

//boardState object definition

function Board() {
    this.x = [];
    this.y = [];
    this.peice = [];
    a = 0;
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            this.x[a] = i;
            this.y[a] = j;
            this.peice[a] = 'e';
            a++;
        }
    }
}

var turn0 = new Board();
var turn1 = new Board();
var turn2 = new Board();
var turn3 = new Board();
var turn4 = new Board();
var turn5 = new Board();
var turn6 = new Board();
var turn7 = new Board();
var turn8 = new Board();

//player object definition

var Player = function(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;
    this.x = [];
    this.y = [];
    this.group = [];
    this.groupIndex = [];
}

var black = new Player("#000000", "#ffffff");
var white = new Player("#ffffff", "#000000");

//functions for board objects

//records current move and pushes old moves down the turn objects
Board.prototype.record = function(X, Y) {
    for (var i = 0; i < turn8.x.length; i++) {
        turn8.peice[i] = turn7.peice[i];
    }
    for (var i = 0; i < turn7.x.length; i++) {
        turn7.peice[i] = turn6.peice[i];
    }
    for (var i = 0; i < turn6.x.length; i++) {
        turn6.peice[i] = turn5.peice[i];
    }
    for (var i = 0; i < turn5.x.length; i++) {
        turn5.peice[i] = turn4.peice[i];
    }
    for (var i = 0; i < turn4.x.length; i++) {
        turn4.peice[i] = turn3.peice[i];
    }
    for (var i = 0; i < turn3.x.length; i++) {
        turn3.peice[i] = turn2.peice[i];
    }
    for (var i = 0; i < turn2.x.length; i++) {
        turn2.peice[i] = turn1.peice[i];
    }
    for (var i = 0; i < turn1.x.length; i++) {
        turn1.peice[i] = turn0.peice[i];
    }
    turn0.peice.splice(0, turn0.peice.length);
    for (var i = 0; i < turn0.x.length; i++) {
        for (var j = 0; j < black.x.length; j++) {
            if (turn0.x[i] === black.x[j] && turn0.y[i] === black.y[j]) {
                turn0.peice[i] = 'b';
            }
        }
        for (var j = 0; j < white.x.length; j++) {
            if (turn0.x[i] === white.x[j] && turn0.y[i] === white.y[j]) {
                turn0.peice[i] = 'w';
            }
        }
        if (turn0.peice[i] !== 'b' && turn0.peice[i] !=='w') {
            turn0.peice[i] = 'e';
        }
    }
}

//takes old moves and returns them up the turn objects
Board.prototype.undo = function() {
    for (var i = 0; i < turn0.x.length; i++) {
        turn0.peice[i] = turn1.peice[i];
    }
    for (var i = 0; i < turn1.x.length; i++) {
        turn1.peice[i] = turn2.peice[i];
    }
    for (var i = 0; i < turn2.x.length; i++) {
        turn2.peice[i] = turn3.peice[i];
    }
    for (var i = 0; i < turn3.x.length; i++) {
        turn3.peice[i] = turn4.peice[i];
    }
    for (var i = 0; i < turn4.x.length; i++) {
        turn4.peice[i] = turn5.peice[i];
    }
    for (var i = 0; i < turn5.x.length; i++) {
        turn5.peice[i] = turn6.peice[i];
    }
    for (var i = 0; i < turn6.x.length; i++) {
        turn6.peice[i] = turn7.peice[i];
    }
    for (var i = 0; i < turn7.x.length; i++) {
        turn7.peice[i] = turn8.peice[i];
    }
}

//pushes turn0 into the player objects
Board.prototype.recall = function() {
    black.x = [];
    black.y = [];
    white.x = [];
    white.y = [];
    for (var i = 0; i < this.x.length; i++) {
        if (this.peice[i] === 'b') {
            black.x.push(this.x[i]);
            black.y.push(this.y[i]);
        }
        else if (this.peice[i] === 'w') {
            white.x.push(this.x[i]);
            white.y.push(this.y[i]);
        }
    }
}

// functions for Player objects

//function for groupLines
Player.prototype.groupLine = function() {
    for (var i = 0; i < this.group.length; i++) {
        for (var j = 0; j < this.group.length; j++) {
            ctx.lineWidth = gridSize/gridNum-minus*2;
            if (this.group[i] === this.group[j] && i !== j) {
                if (dist(1,this.x[i], this.y[i], this.x[j], this.y[j])) {
                    a = this.group[i] - Math.floor(this.group[i]/10)*10;
                    ctx.strokeStyle = colors[a];
                    line(gridX + gridSize/gridNum *this.x[i], gridY + gridSize/gridNum *this.y[i], gridX + gridSize/gridNum *this.x[j], gridY + gridSize/gridNum *this.y[j]);
                }
            }
        }
    }
}

//function for drawing the peices
Player.prototype.drawPeice = function() {
    ctx.lineWidth = 0.75;
    fill = this.color1;
    ctx.strokeStyle = this.color2;
    for (var i = 0; i<this.x.length; i++) {
        circle(gridX + gridSize/gridNum *this.x[i], gridY + gridSize/gridNum *this.y[i], gridSize/gridNum-minus);
    }
}

//function for removing a peice and prevents stacking peices
Player.prototype.remove = function (X, Y) {
    for (var i=0; i<this.x.length; i++) {
        if (X === this.x[i] && Y === this.y[i]) {
            if (button === 1) {
                this.x.splice(i,1);
                this.y.splice(i,1);
                //playSound(getSound("rpg/step-heavy"));
            }
            remove ++;
        }
    }
}

// find groups of peices
Player.prototype.findGroups = function () {
    this.group = [];
    this.groupIndex = [];
    for  (var i = 0; i < this.x.length; i++) {
        this.group[i] = i;
    }
    for (var i = 0; i < this.x.length; i++) {
        for (var j = i+1; j < this.x.length; j++) {
            if (dist(1, this.x[i], this.y[i], this.x[j], this.y[j])) {
                for (var k = 0; k < this.group.length; k++) {
                    if(this.group[j] === this.group[k]) {
                        this.group[k] = this.group[i];
                    }
                }
            }
        }
    }
    for (var i = 0; i < this.x.length; i++) {
        for (var j = i+1; j < this.x.length; j++) {
            if (dist(1, this.x[i], this.y[i], this.x[j], this.y[j])) {
                for (var k = 0; k < this.group.length; k++) {
                    if(this.group[j] === this.group[k]) {
                        this.group[k] = this.group[i];
                    }
                }
            }
        }
    }
    for (var i = 0; i < this.group.length; i++) {
        for (var j = 0; j < this.groupIndex.length; j++) {
            if (this.group[i] !== this.groupIndex[j]) {
                b ++;
            }
        }
        if (b === this.groupIndex.length) {
            this.groupIndex.push(this.group[i]);
        }
        b = 0;
    }
}

//function for adding peices
Player.prototype.addPeice = function(X, Y) {
    this.x.push(X);
    this.y.push(Y);
    //playSound(getSound("rpg/hit-clop"));
    add = 1;
    turn0.record();
    turnStart = 0;
    if (undos > 0) {
        undos --;
    }
}

// removes groups of peices
Player.prototype.removeGroup = function (group) {
    for (var i = 0; i < this.group.length; i++) {
        if (this.group[i] === group) {
            this.x.splice(i, 1);
            this.y.splice(i, 1);
            this.group.splice(i, 1);
            i --;
        }
    }
    for (var j = 0; j < this.groupIndex.length; j++) {
        if (this.groupIndex[j] === group) {
            this.groupIndex.splice(j, 1);
            j --;
        }
    }
}

// function for detecting captured group
Player.prototype.detectCaptures = function(X, Y) {
    if (turn === 1) {
        black.x.push(X);
        black.y.push(Y);
        black.findGroups();
    }
    else {
        white.x.push(X);
        white.y.push(Y);
        white.findGroups();
    }
    capture = 0;
    for (var i = 0; i < this.groupIndex.length; i++) {
        freedom = 0; 
        for (var j = 0; j < this.x.length; j++) {
            if (this.group[j] === this.groupIndex[i]) {
                freedom += 4;
                for (var k = 0; k < black.x.length; k++) {
                    if (dist(1, this.x[j], this.y[j], black.x[k], black.y[k])) {
                        freedom --;
                    }
                }
                for (var k = 0; k < white.x.length; k++) {
                    if (dist(1, this.x[j], this.y[j], white.x[k], white.y[k])) {
                        freedom --;
                    }
                }
                if (this.x[j] <= 0 || this.x[j] >= gridNum) {
                    freedom --;
                }
                if (this.y[j] <= 0 || this.y[j] >= gridNum) {
                    freedom --;
                }
            }
        }
        if (freedom === 0) {
            capturedGroups.push(this.groupIndex[i]);
            capture = 1;
        }
    }
    if (turn === 1) {
        black.x.splice(black.x.length-1, 1);
        black.y.splice(black.y.length-1, 1);
        black.findGroups();
    }
    else {
        white.x.splice(white.x.length-1, 1);
        white.y.splice(white.y.length-1, 1);
        white.findGroups();
    }
}

//check for duplicates
Player.prototype.duplicate = function(X, Y) {
    duplicate = 1;
    if (turn === 1) {
        white.detectCaptures(X, Y);
        for (var i = 0; i < white.group.length; i++) {
            if (white.group[i] === capturedGroups[0]) {
                for (var j = 0; j < turn0.x.length; j++) {
                    if (white.x[i] === turn0.x[j] && white.y[i] === turn0.y[j]) {
                        turn0.peice[j] = 'e';
                        storage.push(j);
                    }
                }
            }
        }
    }
    else {
        black.detectCaptures(X, Y);
        for (var i = 0; i < black.group.length; i++) {
            if (black.group[i] === capturedGroups[0]) {
                for (var j = 0; j < turn0.x.length; j++) {
                    if (black.x[i] === turn0.x[j] && black.y[i] === turn0.y[j]) {
                        turn0.peice[j] = 'e';
                        storage.push(j);
                    }
                }
            }
        }
    }
    for (var i = 0; i < turn0.x.length; i++) {
        if (turn0.x[i] === X && turn0.y[i] === Y) {
            if (turn === 1) {
                turn0.peice[i] = 'b';
            }
            else {
                turn0.peice[i] = 'w';
            }
            for (var j = 0; j < turn0.x.length; j++) {
                if (turn0.peice[j] !== turn1.peice[j]) {
                    duplicate = 0;
                }
            }
            turn0.peice[i] = 'e';
        }
    }
    if (turn === 1) {
        for (var i = 0; i < storage.length; i++) {
            turn0.peice[storage[i]] = 'w';
        }
    }
    else {
        for (var i = 0; i < storage.length; i++) {
            turn0.peice[storage[i]] = 'b';
        }
    }
    storage = [];
}

//A function that draws the background
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
  	// Fill with gradient
  	ctx.fillStyle = grd;
  	ctx.fillRect(0,0,canvasSize,canvasSize);
}


//complex funtions that are heavily reliant on each other and previous functions

// function for having a turn
Player.prototype.turn = function(X, Y) {
    this.duplicate(X, Y);
    if (duplicate === 0) {
        this.detectCaptures(X, Y);
        capturedGroups = [];
        if (capture === 1) {
            if (turn === 1) {
                white.detectCaptures(X, Y);
                for (var u = 0; u < capturedGroups.length; u++) {
                    white.removeGroup(capturedGroups[u]);
                }
            }
            else {
                black.detectCaptures(X, Y);
                for (var u = 0; u < capturedGroups.length; u++) {
                    black.removeGroup(capturedGroups[u]);
                }
            }
            if (capture === 1) {
                    this.addPeice(X, Y);
            }
        }
        else {
            if (turn === 1) {
                white.detectCaptures(X, Y);
                for (var u = 0; u < capturedGroups.length; u++) {
                    white.removeGroup(capturedGroups[u]);
                }
            }
            else {
                black.detectCaptures(X, Y);
                for (var u = 0; u < capturedGroups.length; u++) {
                    black.removeGroup(capturedGroups[u]);
                }
            }
            this.addPeice(X, Y);
        }
        black.findGroups();
        white.findGroups();
        capturedGroups = [];
        duplicate = 0;
    }
}


//draw function to keep board animating on current data
function drawBoard() {
    
    //create board
    background();
    ctx.lineWidth = 3;

    //create gridlines
    ctx.strokeStyle = "#000000";
    for (var i = 0; i<=gridNum; i++) {
        line(gridX + gridSize/gridNum * i, gridY, gridX + gridSize/gridNum * i, gridY +gridSize);
        line(gridX, gridY + gridSize/gridNum * i, gridX + gridSize, gridY + gridSize/gridNum * i);
    }
    
    //create board dots
    fill = "#000000";
    ctx.strokeStyle = fill;
    if (boardSize === 19) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                circle(gridX + (3+6*i)*gridSize/gridNum,gridY + (3+6*j)*gridSize/gridNum, 10);
            }
        }
    }
    else if (boardSize === 13) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                circle(gridX + (3+3*i)*gridSize/gridNum,gridY + (3+3*j)*gridSize/gridNum, 10);
            }
        }
    }
    else if (boardSize === 9) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                circle(gridX + (2+2*i)*gridSize/gridNum,gridY + (2+2*j)*gridSize/gridNum, 10);
            }
        }
    }
    
    else {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                circle(gridX + (3+ (boardSize/2-3.5)*i)*gridSize/gridNum,gridY + (3+ (boardSize/2-3.5)*j)*gridSize/gridNum, 10);
            }
        }
    }
    //draw group lines
    if (groupLines === 1) {
        black.groupLine();
        white.groupLine();
    }
    
    //draw the peices
    black.drawPeice();
    white.drawPeice();
    
    //Turn indicator
    ctx.font = "20px Ariel";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#CFC07F";
    ctx.fillRect(10, 10, 125, 30);
    ctx.rect(10, 10, 125, 30);
    ctx.stroke();
    ctx.lineWidth = 0.75;
    ctx.fillStyle = "#000000";
    if (turn===1) { ctx.fillText("TURN: Black", 20, 35);}
    else if (turn===-1) { ctx.fillText("TURN: White", 20, 35);}
    else {ctx.fillText("TURN:", 20, 35);}
}


//Detects clicking and calls the appropriate function based on where is clicked
function showCoords(event) {
    var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var mouseX = event.clientX - document.getElementById("goboard").offsetLeft + scrollLeft;
    var mouseY = event.clientY - document.getElementById("goboard").offsetTop + scrollTop;
    mouseGridX = Math.round((mouseX-gridX)/gridSize*gridNum);
    mouseGridY = Math.round((mouseY-gridY)/gridSize*gridNum);
    black.remove(mouseGridX, mouseGridY);
    white.remove(mouseGridX, mouseGridY);
    if (remove===0 && mouseGridX>-1 && mouseGridX<boardSize && mouseGridY>-1 && mouseGridY<boardSize) {
        if (button === 2) {
            black.addPeice(mouseGridX, mouseGridY);
        }
        else {
            if (turn===1) {
                black.turn(mouseGridX, mouseGridY);
            }
            else if (turn===-1) {
                white.turn(mouseGridX, mouseGridY);
            }
            if (turn !== 0 && add === 1) {
                turn*=-1;
                skipCount=0;
            }
        
        }
    }

    black.findGroups();
    white.findGroups();
    remove=0;
    groupped=0;
    add = 0;
    drawBoard();
}

//A function that runs once on the webpage loading or restarting the game
function start() {
    canvasSize = document.getElementById("canvasSize").value;
    document.getElementById("goboard").width = canvasSize;
    document.getElementById("goboard").height = canvasSize;
    boardSize = document.getElementById("boardSize").value;
    if (document.getElementById("2players").checked) {
    	numOfPlayers = document.getElementById("2players").value;
    }
    else if (document.getElementById("3players").checked) {
    	numOfPlayers = document.getElementById("3players").value;
    }
    else if (document.getElementById("4players").checked) {
    	numOfPlayers = document.getElementById("4players").value;
    }
    gridNum = boardSize - 1;
	gridSize = canvasSize - 100;
    turn = 1;
    turnStart = 1;
    undos = 8;
    turn0 = new Board();
    turn1 = new Board();
    turn2 = new Board();
    turn3 = new Board();
    turn4 = new Board();
    turn5 = new Board();
    turn6 = new Board();
    turn7 = new Board();
    turn8 = new Board();
    black = new Player("#000000", "#ffffff");
	white = new Player("#ffffff", "#000000");
    button = 0;
    background();
    drawBoard();
      
}

//A function to skip turns
function skip() {
    if (button === 0) {
        if (skipCount<1) {
            turn*=-1;
            skipCount++;
        }
        else {
            document.getElementById("skipbutton").innerHTML = "Remove all dead peices, then click here";
	    turn = 0;
            button++;
        }
    }
    else if (button === 1) {
	document.getElementById("skipbutton").innerHTML = "Fill in blacks territory, then click here";
	turn = 1;
        button++;
    }
    else if (button === 2) {
	score = black.x.length;
	document.getElementById("skipbutton").innerHTML = "Click here for score";
	var alertString = "Black:" + score + "   White:" + (boardSize * boardSize - score);
	alert(alertString);
    }
	drawBoard();
}

//A function to undo turns
function undo() {
    if (undos < 8) {
        turn0.undo();
        turn0.recall();
        turn *=-1;
        undos ++;
	    drawBoard();
    }
}

//A function to toggle grouplines
function groupLineToggle() {
    groupLines *= -1;
	drawBoard();
}
