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
var playerList = [];

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
    "Young",
    "Bond"
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
    this.surname = randomName(Gender);
  }
  else {
    this.surname = Name; //Identifier, string
  }
  this.gender = Gender; //Gender identity, male female (or transgender in future?), string
  this.avatar = Avatar; //Main character or not, boolean
  this.team = Team; //Which side they are on, string
  this.class = Class; //Describes what the human is specialized in (Soldier, Hunter, Engineer, Doctor), string
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
  this.effect = "na";
  this.aim = 0.95;
  this.x = X; //Board location x axis, integer
  this.y = Y; //Board location y axis, integer
  this.z = Z; //Board location z axis, integer
  playerList.push(this);
}

//Defines the Item object
function Item(Name, Class, PowerModifier, Flavor, X, Y, Z) {
  this.surname = Name; //Name of the item
  this.class = Class; //Where the item is used
  this.powerMod = PowerModifier; //A modifier that increases the effect of the item
  this.flavor = Flavor; //A description of the item
}

//Defines the Zombie Object
function Zombie(Class, Level, X, Y, Z) {
  this.class = Class;
  this.level = Level;
  this.maxHealth = 100;
  this.x = X; //Board location x axis, integer
  this.y = Y; //Board location y axis, integer
  this.z = Z; //Board location z axis, integer
}

//Define the types of spaces
function Space(Name, Breakable, MaxHealth, Passable, Transparent, Color, Flavor) {
  this.surname = Name;
  this.breakable = Breakable
  this.maxHealth = MaxHealth;
  this.passable = Passable;
  this.transparent = Transparent;
  this.hexColor = Color;
  this.flavor = Flavor;
}

//Define different spaces
var wall = new Space("Wall", true, 1000, false, false, "#888888", "A wall that seperates inside from outside, tough to break");
var weakWall = new Space("Weak Wall", true, 100, false, false, "#888888", "A wall that seperates inside from outside, easy to break");
var toughWall = new Space("Tough Wall", false, 1000, false, false, "#888888", "A wall that seperates inside from outside, impossible to break");
var floor = new Space("Floor", false, 1000, true, true, "#d5a65d", "A place to walk on, indoors unless walls get broken");
var weakFloor = new Space("Weak Floor", true, 100, true, true, "#d5a65d", "A place to walk on, until it gets broken");
var weakWindow = new Space("Window", true, 100, false, true, "clear", "Something people look out of");
var toughWindow = new Space("Bullet Proof Window", false, 1000, false, true, "clear", "Something banktellers look out of");
var barrier = new Space("Barrier", true, 500, false, true, "#f0ff00", "What people build to keep zombies out");
var closedDoor = new Space("Door", true, 500, false, false, "#ff0000", "Used to enter or leave");
var lockedDoor = new Space("Door", true, 500, false, false, "#ff0000", "Not used to enter or leave");
var openedDoor = new Space("Door", false, 500, true, true, "clear", "Were you raised in a barn");
var closedSteelDoor = new Space("Steel Door", false, 1000, false, false, "#4f4f4f", "Used to enter or leave");
var lockedSteelDoor = new Space("Steel Door", false, 1000, false, false, "#4f4f4f", "Not used to enter or leave");
var openedSteelDoor = new Space("Steel Door", false, 1000, true, true, "clear", "Were you raised in a barn");
var stairs = 0;
var empty = new Space("Empty Space", false, 1, true, true, "#000000", "Empty space, existential nothingness");
var chest = new Space("Chest", true, 250, false, true, "#ff00ff", "Were treasure is hidden");
var library = new Space("Library", true, 100, false, false, "#ffff00", "Were knowledge is hidden");
var grass = new Space("Grass", false, 500, true, true, "#00ff00", "The type people mow, not smoke");
var road = new Space("Road", false, 500, true, true, "#383838", "A path for cars");
var tree = new Space("Tree", true, 1000, true, false, "#006000", "Nature's skyscrapers");
var water = new Space("Water", false, 4000, false, true, "#0f00ff", "What people swim in");
var rubble = new Space("Rubble", false, 4000, true, true, "#b4b4b4", "What used to be a building");

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
