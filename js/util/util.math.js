Number.prototype.boundary = function(min, max) {return Math.min(Math.max(this, min), max)};
Number.prototype.inRange = function(min, max) {return min <= this && this <= max};
Number.prototype.lerp = function(dn, dt) {return this+dn*dt};
Number.prototype.interpolate = function(a, b) {return a+(b-a)*this};
Number.prototype.epsilon = function(a, b) { return Math.abs(a - b) < this; }
Math.randomInt = function(min, max) {return Math.round(Math.random().interpolate(min, max))};
Math.randomChoice = function(options) { return options[Math.randomInt(0, options.length-1)]};
Math.easeIn = function(a, b, pct) { return a + (b-a)*Math.pow(pct,2)};
Math.easeOut = function(a, b, pct) { return a + (b-a)*(1-Math.pow(1-pct, 2))};
Math.easeInOut = function(a, b, pct) { return a + (b-a)*((-Math.cos(pct*Math.PI)/2)+0.5)};
Math.TAU = 2 * Math.PI;
function distance(pair_one, pair_two) {
  return Math.sqrt(Math.pow(pair_one.x - pair_two.x, 2) + Math.pow(pair_one.y - pair_two.y, 2));
}

function accelerate(v, accel, dt) {
  return v + (accel * dt);
}

function increase(start, inc, max) {
  let result = start + inc;
  while (result >= max) {
    result -= max;
  }
  while (result < 0) {
    result += max;
  }
  return result;
}
const exponential = (a, b) => { return 1 / (Math.pow(Math.E, (a * a * b)))};
const uuid = () => {
  return "U"+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
