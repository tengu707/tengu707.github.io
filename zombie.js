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

//Create a list of names
var names = {
  first:{
    male:[
      "Noah",
      "Liam",
      "Mason",
      "Jacob",
      "William",
      "Ethan",
      "James",
      "Alexander",
      "Michael",
      "Ben",
      "Elijah",
      "Daniel",
      "Aiden",
      "Logan",
      "Matt",
      "Lucas",
      "Jack",
      "Dave",
      "Oliver",
      "Joe"
    ],
    female:[
      "Sarah",
      "Rose",
      "Emma",
      "Olivia",
      "Sophia",
      "Ava",
      "Isabella",
      "Mia",
      "Abigail",
      "Emily",
      "Madison",
      "Beth",
      "Chloe",
      "Avery",
      "Zoey",
      "Lily",
      "Hannah",
      "Alli",
      "Nora",
      "Anna"
      ]
	},
  last:[
    "Brown",
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Lewis",
    "Lee",
    "Walker",
    "Hall",
    "Allen",
    "Young"
  ]
};

function randomName(Gender) {
	if (Gender === "male") {
      return names.first.male[Math.round(Math.random() * (names.first.male.length - 1))] 
      + " " + names.last[Math.round(Math.random() * (names.last.length - 1))];
    }
    else {
      return names.first.female[Math.round(Math.random() * (names.first.female.length - 1))] 
      + " " + names.last[Math.round(Math.random() * (names.last.length - 1))];
    }
}

//Defines the Human object
function Human(Name, Gender, Avatar, Team, Level, Class, X, Y, Z) {
  if (Name === "random") {
    this.name = randomName(Gender);
  }
  else {
    this.name = Name; //Identifier, string
  }
  this.gender = Gender; //Gender identity, male female (or transgender in future?), string
  this.avatar = Avatar; //Main character or not, boolean
  this.team = Team; //Which side they are on, string
  this.class = Class; //Describes what the human is specialized in, string
  this.level = Level; //How powerfull the human is, integer
  this.experience = 0;
  this.weapon = "na";
  this.armor = "na";
  this.backpack = [];
  this.skill = [];
  this.speed = 2;
  this.vision = 3;
  this.baseDamage = 2 * this.level;
  this.range = 1;
  this.health = 100;
  this.energy = 100;
  this.aim = 0.95;
  this.location.x = X; //Board location x axis, integer
  this.location.y = Y; //Board location y axis, integer
  this.location.z = Z; //Board location z axis, integer
}

//Defines the Item object
function Item(Name, Type, PowerModifier, Description, X, Y, Z) {
  this.name = Name; //Name of the item
  this.type = Type; //Where the item is used
  this.powerMod = PowerModifier; //A modifier that increases the effect of the item
  this.description = Description; //A description of the item
  this.location.x = X; //Board location x axis, integer
  this.location.y = Y; //Board location y axis, integer
  this.location.z = Z; //Board location z axis, integer
}

//Defines the Zombie Object
function Zombie(Type, Level, X, Y, Z) {
  this.type = Type;
  this.level = Level;
  this.location.x = X; //Board location x axis, integer
  this.location.y = Y; //Board location y axis, integer
  this.location.z = Z; //Board location z axis, integer
}

//Define the types of spaces
function Space(Type, Breakable, Passable, Description, Color, X, Y, Z) {
  this.type = Type;
  this.breakable = Breakable;
  this.passable = Passable;
  this.description = Description;
  this.color = Color;
  this.location.x = X; //Board location x axis, integer
  this.location.y = Y; //Board location y axis, integer
  this.location.z = Z; //Board location z axis, integer
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
