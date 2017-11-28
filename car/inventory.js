carIndex = [];

var Car = function(Name, Picture, Description) {
  this.name = Name;
  this.picture = "image/" + Picture;
  this.description = Description;
  carIndex.push(this.name);
}

var sierra = new Car("Sierra", "sierra.png", "This is car 1");
var splash = new Car("Splash", "splash.png", "This is car 2");
var swift = new Car("Swift", "swift.png", "This is car 3");
var sx4 = new Car("SX4", "sx4.png", "This is car 4");
var r1000 = new Car("GSX R1000", "r1000.png", "This is car 5");

alert(carIndex[3]);
