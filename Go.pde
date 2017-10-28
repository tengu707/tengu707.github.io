//Variables
var boardArray = [1,3];
var boardSize = 0;
for (var j = 0; j< boardArray.length; j++) {
    boardSize= boardSize * 10 + boardArray[j];
}
var gridNum = boardSize - 1;
var gridSize = 900;
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

//array for remembering board state
var minus = 3;

//group color scheme
stroke(7, 115, 18);
var colors = {
    R: [255, 255, 230,   0,   0,   0, 255, 250,   7, 100],
    G: [  0, 170, 255, 255, 238,   0,  30, 135, 115, 100],
    B: [  0,   0,   0,  13, 255, 255, 230, 202,  18, 100]
};

//data for button Size
var x1 = 150;
var x2 = 250;
var y1 = 10;
var y2 = 40;
var x3 = 875;
var x4 = 975;
var y3 = y1;
var y4 = y2;
var x5 = 790;
var x6 = x4;
var y5 = 960;
var y6 = 990;

//for determining mouse position
var mouseGridX = 0;
var mouseGridY = 0;

//boardState object definition

var Board = function() {
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
};

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

var Player = function(r1, g1, b1, r2, g2, b2) {
    this.r1 = r1;
    this.g1 = g1;
    this.b1 = b1;
    this.r2 = r2;
    this.g2 = g2;
    this.b2 = b2;
    this.x = [];
    this.y = [];
    this.group = [];
    this.groupIndex = [];
};

var black = new Player(0, 0, 0, 255, 255, 255);
var white = new Player(255, 255, 255, 0, 0, 0);

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
};

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
};

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
};

// functions for Player objects

//function for groupLines
Player.prototype.groupLine = function() {
    for (var i = 0; i < this.group.length; i++) {
        for (var j = 0; j < this.group.length; j++) {
            strokeWeight(gridSize/gridNum-minus*2);
            if (this.group[i] === this.group[j] && i !== j) {
                if (dist(this.x[i], this.y[i], this.x[j], this.y[j]) === 1) {
                    a = this.group[i]-floor(this.group[i]/10)*10;
                    stroke(colors.R[a], colors.G[a], colors.B[a]);
                    line(gridX + gridSize/gridNum *this.x[i], gridY + gridSize/gridNum *this.y[i], gridX + gridSize/gridNum *this.x[j], gridY + gridSize/gridNum *this.y[j]);
                }
            }
        }
    }
};

//function for drawing the peices
Player.prototype.drawPeice = function() {
    strokeWeight(0.75);
    fill(this.r1, this.g1, this.b1);
    stroke(this.r2, this.g2, this.b2);
    for (var i = 0; i<this.x.length; i++) {
        ellipse(gridX + gridSize/gridNum *this.x[i], gridY + gridSize/gridNum *this.y[i], gridSize/gridNum-minus, gridSize/gridNum-minus);
    }
};

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
};

// find groups of peices
Player.prototype.findGroups = function () {
    this.group = [];
    this.groupIndex = [];
    for  (var i = 0; i < this.x.length; i++) {
        this.group[i] = i;
    }
    for (var i = 0; i < this.x.length; i++) {
        for (var j = i+1; j < this.x.length; j++) {
            if (dist(this.x[i], this.y[i], this.x[j], this.y[j]) === 1) {
                for (var k = 0; k < this.group.length; k++) {
                    if(this.group[j] === this.group[k]) {
                        this.group[k] =this.group[i];
                    }
                }
            }
        }
    }
    for (var i = 0; i < this.x.length; i++) {
        for (var j = i+1; j < this.x.length; j++) {
            if (dist(this.x[i], this.y[i], this.x[j], this.y[j]) === 1) {
                for (var k = 0; k < this.group.length; k++) {
                    if(this.group[j] === this.group[k]) {
                        this.group[k] =this.group[i];
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
};

//function for adding peices
Player.prototype.addPeice = function(X, Y) {
    this.x.push(X);
    this.y.push(Y);
    //playSound(getSound("rpg/hit-clop"));
    add = 1;
    turn0.record();
    start = 0;
    if (undos > 0) {
        undos --;
    }
};

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
};

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
                    if (dist(this.x[j], this.y[j], black.x[k], black.y[k]) === 1) {
                        freedom --;
                    }
                }
                for (var k = 0; k < white.x.length; k++) {
                    if (dist(this.x[j], this.y[j], white.x[k], white.y[k]) === 1) {
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
};

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
};

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
};

//draw function to keep board animating on current data
var drawBoard = function() {
    
    //create board
    background(161, 139, 61);
    strokeWeight(3);

    //create gridlines
    stroke(0);
    for (var i = 0; i<=gridNum; i++) {
        line(gridX + gridSize/gridNum * i, gridY, gridX + gridSize/gridNum * i, gridY +gridSize);
        line(gridX, gridY + gridSize/gridNum * i, gridX + gridSize, gridY + gridSize/gridNum * i);
    }
    
    //create board dots
    fill(0);
    noStroke();
    if (boardSize === 19) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                ellipse(gridX + (3+6*i)*gridSize/gridNum,gridY + (3+6*j)*gridSize/gridNum, 10, 10);
            }
        }
    }
    else if (boardSize === 13) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                ellipse(gridX + (3+3*i)*gridSize/gridNum,gridY + (3+3*j)*gridSize/gridNum, 10, 10);
            }
        }
    }
    else if (boardSize === 9) {
        for (var i = 0; i<3; i++) {
            for(var j = 0; j<3; j++) {
                ellipse(gridX + (2+2*i)*gridSize/gridNum,gridY + (2+2*j)*gridSize/gridNum, 10, 10);
            }
        }
    }
    
    else {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                ellipse(gridX + (3+ (boardSize/2-3.5)*i)*gridSize/gridNum,gridY + (3+ (boardSize/2-3.5)*j)*gridSize/gridNum, 10, 10);
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
    textSize(25);
    strokeWeight(1);
    fill(207, 192, 127);
    rect(10, 10, 125, 30);
    fill(0);
    strokeWeight(0.75);
    text("TURN:", 20, 35);
    if (turn===1) { fill(0); stroke(255, 255, 255);}
    else if (turn===-1) { fill(255, 255, 255); stroke(0);}
    else {noFill(); noStroke();}
    ellipse(115, 25, 20, 20);
        
    //display board Size
    fill(207, 192, 127);
    stroke(0);
    strokeWeight(1);
    rect (10, 360, 115, 30);
    fill(0);
    text("SIZE: " + boardSize,20, 385);
    
    //Button
    fill(207, 192, 127);
    stroke(0);
    strokeWeight(1);
    rect (x1, y1, x2-x1, y2-y1);
    if (button < 1) {
        rect (x3, y3, x4-x3, y4-y3);
    }
    rect (x5, y5, x6-x5, y6-y5);
    fill(0);
    
    if (button < 1) {
        text("UNDO", 290, 35);
    }
    text("GROUPLINES", 200, 985);
    if (button < 1) {
        text("SKIP",173,35);
    }
    else if (button < 2) {
        text("Remove all captures",150,35);
        turn = 0;
    }
    else if (button < 3) {
        text("Fill in blacks Territory",150,35);
        turn = 1;
    }
    else if (button < 4) {
        turn = 0;
        score = black.x.length;
        text("Black:" + score + "   White:" + (boardSize * boardSize-score) ,150,35);
    }
        
    else {
        text("Restarting game", 150, 35);
        turn = 1;
        start = 1;
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
        black = new Player(0, 0, 0, 255, 255, 255);
        white = new Player(255, 255, 255, 0, 0, 0);
        x1 = 150;
        x2 = 250;
        button = 0;
        
        //create board
        background(161, 139, 61);
        strokeWeight(3);

        //create gridlines
        stroke(0);
        for (var i = 0; i<=gridNum; i++) {
            line(gridX + gridSize/gridNum * i, gridY, gridX + gridSize/gridNum * i, gridY +gridSize);
            line(gridX, gridY + gridSize/gridNum * i, gridX + gridSize, gridY + gridSize/gridNum * i);
        }
    
        //create board dots
        fill(0);
        noStroke();
        if (boardSize === 19) {
            for (var i = 0; i<3; i++) {
                for(var j = 0; j<3; j++) {
                    ellipse(gridX + (3+6*i)*gridSize/gridNum,gridY + (3+6*j)*gridSize/gridNum, 10, 10);
                }
            }
        }
        else if (boardSize === 13) {
            for (var i = 0; i<3; i++) {
                for(var j = 0; j<3; j++) {
                    ellipse(gridX + (3+3*i)*gridSize/gridNum,gridY + (3+3*j)*gridSize/gridNum, 10, 10);
                }
            }
        }
        else if (boardSize === 9) {
            for (var i = 0; i<3; i++) {
                for(var j = 0; j<3; j++) {
                    ellipse(gridX + (2+2*i)*gridSize/gridNum,gridY + (2+2*j)*gridSize/gridNum, 10, 10);
                }
            }
        }
    
        else {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    ellipse(gridX + (3+ (boardSize/2-3.5)*i)*gridSize/gridNum,gridY + (3+ (boardSize/2-3.5)*j)*gridSize/gridNum, 10, 10);
                }
            }
        }
        
        //Turn indicator
        textSize(25);
        strokeWeight(1);
        stroke(0);
        fill(207, 192, 127);
        rect(10, 10, 125, 30);
        
        fill(0);
        strokeWeight(0.75);
        text("TURN:", 20, 35);
        fill(0); stroke(255, 255, 255);
        ellipse(115, 25, 20, 20);
        
        //Button
        fill(207, 192, 127);
        stroke(0);
        strokeWeight(1);
        rect (x1, y1, x2-x1, y2-y1);
        rect (x3, y3, x4-x3, y4-y3);
        rect (x5, y5, x6-x5, y6-y5);
        fill(0);
        text("UNDO", 290, 35);
    
        //display board Size
        fill(207, 192, 127);
        stroke(0);
        strokeWeight(1);
        rect (10, 360, 115, 30);
        fill(0);
        text("SIZE: " + boardSize,20, 985);
        text("GROUPLINES", 200, 985);
        text("SKIP",173,35);
    }
};

drawBoard();

//Detects clicking and calls the appropriate function based on where is clicked
mouseClicked = function() {
    mouseGridX = round((mouseX-gridX)/gridSize*gridNum);
    mouseGridY = round((mouseY-gridY)/gridSize*gridNum);
    if (mouseX>x1 && mouseX<x2 && mouseY>y1 && mouseY<y2) {
        if (button === 0) {
            if (skipCount<1) {
                turn*=-1;
                skipCount++;
            }
            else {
                x1= 140;
                x2 = 385;
                button++;
            }
        }
        else {
            button++;
        }
    }
    if (mouseX>x3 && mouseX<x4 && mouseY>y3 && mouseY<y4 && button === 0) {
        if (undos < 8) {
            turn0.undo();
            turn0.recall();
            turn *=-1;
            undos ++;
        }
    }
    if (mouseX>x5 && mouseX<x6 && mouseY>y5 && mouseY<y6) {
        groupLines *= -1;
    }
    
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
};

//resizes the board based on which key is clicked, enacting during a game may create bugs!
keyPressed = function() {
    if (start === 1) {
        if (key > 47 && key < 58 && boardSize < 100){
            boardArray.push(key-48);
        }
        else {
            boardArray.splice(boardArray.length - 1, 1);
        }
        boardSize = 0;
        for (var j = 0; j<boardArray.length; j++) {
            boardSize= boardSize * 10 + boardArray[j];
        }
        gridNum = boardSize - 1;
        var turn0 = new Board();
        var turn1 = new Board();
        var turn2 = new Board();
        var turn3 = new Board();
        var turn4 = new Board();
        var turn5 = new Board();
        var turn6 = new Board();
        var turn7 = new Board();
        var turn8 = new Board();
    }
    drawBoard();
};
