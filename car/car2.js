var Car = function() {};

Car.prototype.honk = function() {
  console.log('honk honk');
};

var myCar1 = new Car();
var myCar2 = new Car();

myCar1.honk();
myCar2.honk();

Car.prototype.honk = function() {
  console.log('meep meep');
};

myCar1.honk();
myCar2.honk();

Car.prototype.drive = function() {
  console.log('vrooom...');
};
myCar1.drive();
myCar2.drive();
