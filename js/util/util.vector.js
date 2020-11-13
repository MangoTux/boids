class Vector {
  constructor(vector) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    if (typeof vector !== "undefined") {
      this.initialize(vector);
    }
  }

  initialize(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
  }

  getVector() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }

  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
  }

  getMagnitude() {
    let total = 0;
    for (const axis of ["x", "y", "z"]) {
      total += Math.pow(this[axis], 2);
    }
    return Math.sqrt(total);
  }

  clamp(scalar) {
    const magnitude = this.getMagnitude();
    if (magnitude > scalar) {
      this.divide(magnitude);
      this.multiply(scalar);
    }
  }

  normalize() {
    const magnitude = this.getMagnitude();
    this.divide(magnitude);
  }

  // toAngles, maybe?
}
