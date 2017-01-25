var Car = function() {
  this.honk = function() {
    console.log('honk honk');
  };
};

var myCar1 = new Car();
var myCar2 = new Car();

console.log(myCar1.constructor);
console.log(myCar2.constructor);
console.log(myCar1.honk);
