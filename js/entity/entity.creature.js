class Creature {
  constructor(scope, x, y, z) {
    this.scope = scope;
    this.position = {
      x: x,
      y: y,
      z: z,
    };
    this.height = 23;
    this.width = 16;
    this.id = uuid();
    this.render_fillStyle = '#40d870';
  }

  getPosition() {
    return this.position;
  }

  getDistanceTo(p_b) {
    let p_a = this.getPosition();
    let total = 0;
    for (const axis of ["x", "y", "z"]) {
      total += Math.pow(p_b[axis] - p_a[axis], 2);
    }
    return Math.sqrt(total);
  }

  /*
  o_x and o_y are the camera-calculated offsets for drawing
  */
  render(o_x, o_y) {
    this.scope.context.fillStyle = this.render_fillStyle;
  }

  update() {
    this.dt = this.scope.getDt();
  }
}
