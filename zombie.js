//basic functions
var c = document.getElementById("zombieCanvas");
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

//Defines the Human object
function Human(Name, Avatar, Team, Level, Class, X, Y) {
  this.name = Name;
  this.avatar = Avatar; //Boolean (only 1)
  this.team = Team; //Which side they are on
  this.class = Class; //Describes what the human is specialized in
  this.level = Level; //How powerfull the human is
  this.experience = 0;
  this.weapon = "na";
  this.armor = "na";
  this.backpack = [];
  this.skill = [];
  this.speed = 2;
  this.vision = 3;
  this.baseDamage = 2 * this.level;
  this.range = 1;
  this.hunger = 100;
  this.health = 100;
  this.energy = 100;
  this.aim = 0.95;
  this.locationX = X;
  this.locationY = Y;
}

//Defines the Item object
function Item(Name, Type, PowerModifier, Description) {
  this.name = Name; //Name of the item
  this.type = Type; //Where the item is used
  this.powerMod = PowerModifier; //A modifier that increases the effect of the item
  this.description = Description; //A description of the item
}

//Defines the Zombie Object
function Zombie(Type, Level, X, Y) {
  this.type = Type;
  this.level = Level;
  this.x = X;
  this.y = Y;
}

//Define the types of spaces
function Space(Type, Breakable, Passable, Description) {
  this.type = Type;
  this.breakable = Breakable;
  this.passable = Passable;
  this.description = Description;
}

//Defines the board
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
}
