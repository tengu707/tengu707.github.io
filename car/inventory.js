carIndex = [];

var Car = function(ID, Name, Picture, Class, MPG, Price, Description) {
  this.id = ID;
  this.name = Name;
  this.picture = "image/" + Picture;
  this.class = Class;
  this.mpg = MPG;
  this.price = Price;
  this.tax = 0.08 * this.price;
  this.total = this.tax + this.price;
  this.description = Description;
  this.show = true;
  carIndex.push(this);
}

var sierra = new Car("sierra", "Sierra", "sierra.png", "Off-Road Mini SUV", 28, 3900, "Our off-road model that can handle the most difficult road.");
var splash = new Car("splash", "Splash", "splash.png", "City Car", 54, 5900,  "Our best commuter, with superb mpg and a comfortable ride.");
var swift = new Car("swift", "Swift", "swift.png", "Super Mini", 36, 17900, "A stylish, powerful and economic mini.");
var sx4 = new Car("sx4", "SX4", "sx4.png", "Compact Car", 25, 19900, "Enjoy the perfect combo of power and comfort.");
var r1000 = new Car("r1000", "GSX R1000", "r1000.png", "Motorcycle", 35, 14900, "Our sports bike model for the street racing types.");

//Inventory Filling Function
var inventoryFill = function() {
  var inventoryString = "";
  for(i in carIndex) {
    if(carIndex[i].show) {
      inventoryString = inventoryString + '<article id="' + carIndex[i].id + '"><div class="col-sm-6 col-md-4"><div class="thumbnail"><img id="img' + carIndex[i].id + '" src=" ' + carIndex[i].picture + '" width=200 height=200 alt="Picture Error"><div class="caption"><h3><strong>Model:</strong> ' + carIndex[i].name + '</h3><p><strong>Class:</strong> ' + carIndex[i].class + '   <strong>MPG:</strong> ' + carIndex[i].mpg + '</p><p><strong>Description:</strong> ' + carIndex[i].description + '</p><p><strong>Price:</strong> $' + carIndex[i].price + '   <strong>Tax:</strong> $' + carIndex[i].tax + '   <strong>Total:</strong> $' + carIndex[i].total + '</p></div></div></div></article>';
    }
  }
  document.getElementById("inventory").innerHTML = inventoryString;
}

inventoryFill();
