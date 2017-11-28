carIndex = [];

var Car = function(ID, Name, Picture, Description) {
  this.id = ID;
  this.name = Name;
  this.picture = "image/" + Picture;
  this.description = Description;
  carIndex.push(this.ID);
}

var sierra = new Car("sierra", "Sierra", "sierra.png", "This is car 1");
var splash = new Car("splash", "Splash", "splash.png", "This is car 2");
var swift = new Car("swift", "Swift", "swift.png", "This is car 3");
var sx4 = new Car("sx4", "SX4", "sx4.png", "This is car 4");
var r1000 = new Car("r1000", "GSX R1000", "r1000.png", "This is car 5");

for(var i = 0; i < carIndex.length; i++) {
  
}
