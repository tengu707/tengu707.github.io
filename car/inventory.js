carIndex = [];

var Car = function(ID, Name, Picture, Description) {
  this.id = ID;
  this.name = Name;
  this.picture = "image/" + Picture;
  this.description = Description;
  carIndex.push(this.id);
}

var sierra = new Car("sierra", "Sierra", "sierra.png", "This is car 1");
var splash = new Car("splash", "Splash", "splash.png", "This is car 2");
var swift = new Car("swift", "Swift", "swift.png", "This is car 3");
var sx4 = new Car("sx4", "SX4", "sx4.png", "This is car 4");
var r1000 = new Car("r1000", "GSX R1000", "r1000.png", "This is car 5");

//create string to fill inventory
var inventoryString = "";
alert("start");
for(i in carIndex) {
  alert(carIndex[i]);
  inventoryString = inventoryString + '<article id=" ' + carIndex[i].id + ' "><div class="col-sm-6 col-md-4"><div class="thumbnail"><img id="img' + carIndex[i].id + ' " src=" ' + carIndex[i].picture + ' " width=200 height=200 alt="Picture Error"><div class="caption"><h3><strong>Name:</strong> ' + carIndex[i].name + ' </h3><p><strong>Description:</strong> ' + carIndex[i].description + ' </p></div></div></div></article>';
}
alert(inventoryString);
document.getElementById("inventory").innerHTML = inventoryString;
