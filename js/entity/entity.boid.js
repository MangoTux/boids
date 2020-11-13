// With thanks: http://www.vergenet.net/~conrad/boids/pseudocode.html
class Boid extends Creature {
  constructor(scope, x, y, z) {
    super(scope, x, y, z);
    this.home = this.position;
    this.velocity = new Vector({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: 0,
    });
    this.velocity.normalize();
    this.velocity.multiply(50);
    this.config = {
      vision: 100,
      avoid_distance: 30,
      homesick_distance: 350,
      velocity_max: 150,
    }
    this.colony = "base";
    this.factor = {
      separation: 1,
      alignment: 8,
      cohesion: 100,
    };
    this.rules = [
      {
        function: "rule_separation",
        color: "cyan",
        active: true,
        factor: 1,
        vector_res: null,
      },
      {
        function: "rule_alignment",
        color: "magenta",
        active: true,
        factor: 4,
        vector_res: null,
      },
      {
        function: "rule_cohesion",
        color: "yellow",
        active: true,
        factor: 100,
        vector_res: null,
      },
      {
        function: "rule_home",
        color: "lime",
        active: true,
        factor: 1,
        vector_res: null,
      }
    ];
    this.length = 20;
    this.height = 10;
    this.time_cycle = 0;
    this.active = false;
  }

  getVelocity() {
    return this.velocity.getVector();
  }

  // Returns all neighbors of a
  getNeighbors() {
    const neighbors = [];
    for (const boid of this.scope.getEntities()) {
      if (this.id == boid.id) { continue; }
      if (this.getDistanceTo(boid.getPosition()) < this.config.vision) {
        neighbors.push(boid);
      }
    }
    return neighbors;
  }

  // Alignment:
  // Steer towards the average heading of local flockmates
  rule_alignment(neighbors) {
    const alignment = new Vector();
    if (neighbors.length == 0) {
      return alignment.getVector();
    }
    for (const neighbor of neighbors) {
      alignment.add(neighbor.getVelocity());
    }
    alignment.divide(neighbors.length);
    alignment.subtract(this.getVelocity());
    alignment.divide(this.factor.alignment);
    return alignment.getVector();
  }

  // Separation:
  // Steer to avoid crowding local flockmates
  rule_separation(neighbors) {
    const separation = new Vector();
    if (neighbors.length == 0) {
      return separation.getVector();
    }
    for (const neighbor of neighbors) {
      const distance = this.getDistanceTo(neighbor.getPosition());
      if (distance > this.config.avoid_distance) { continue; }
      const delta_position = new Vector(neighbor.getPosition());
      delta_position.subtract(this.getPosition());
      delta_position.divide(distance);
      separation.subtract(delta_position.getVector());
    }
    return separation.getVector();
  }

  // Cohesion:
  // Steer to move towards the average center of mass of local flockmates
  rule_cohesion(neighbors) {
    const cohesion = new Vector();
    if (neighbors.length == 0) {
      return cohesion.getVector();
    }
    for (const neighbor of neighbors) {
      cohesion.add(neighbor.getPosition());
    }
    cohesion.divide(neighbors.length);
    cohesion.subtract(this.position);
    cohesion.divide(this.factor.cohesion);

    return cohesion.getVector();
  }

  rule_home(neighbors) {
    const home = new Vector(this.home);
    home.subtract(this.position);
    if (home.getMagnitude() < this.config.homesick_distance) {
      return (new Vector()).getVector();
    }
    home.normalize();
    return home.getVector();
  }

  // Rough fly update if idle
  update() {
    super.update();
    const neighbors = this.getNeighbors();

    const velocity = new Vector(this.velocity.getVector());
    const position = new Vector(this.position);

    for (const [index, rule] of Object.entries(this.rules)) {
      if (!rule.active) { continue; }
      // Store a cached copy for debugging
      this.rules[index].vector_res = this[rule.function](neighbors);
      velocity.add(this.rules[index].vector_res);
    }
    velocity.clamp(this.config.velocity_max);
    if (this.active && keys.isPressed.space()) {
      console.log(this);
      throw "error";
    }

    const dv = new Vector(velocity.getVector());
    dv.multiply(this.dt);
    position.add(dv.getVector());
    this.velocity = velocity;
    this.position = position.getVector();
  }

  // This is currently abstracted to a 2d projection;
  // Will update based on relative camera positioning and depth.
  render(o_x, o_y) {
    /*
    Render a tetrahedron based on position quaternion.
    Position is based at midpoint of back for now.
    */
    // Generally, TODO
    /*
    Given a base position, base heading, and camera position/heading, figure out projection of prism
    */
    let theta = Math.atan2(-this.velocity.getVector().y, this.velocity.getVector().x);
    const sin_theta = Math.sin(theta);
    const cos_theta = Math.cos(theta);
    let color = this.active ? "red" : this.render_fillStyle;
    for (const neighbor of this.getNeighbors()) {
      if (neighbor.active) {
        color = "yellow";
        break;
      }
    }
    let polygon = [
      {
        x: this.position.x - this.height/2 * sin_theta - o_x,
        y: this.position.y - this.height/2 * cos_theta - o_y
      },
      {
        x: this.position.x + this.length * cos_theta - o_x,
        y: this.position.y - this.length * sin_theta - o_y
      },
      {
        x: this.position.x + this.height/2 * sin_theta - o_x,
        y: this.position.y + this.height/2 * cos_theta - o_y
      }
    ];
    this.scope.camera.polygon(polygon, true, color);
    if (this.active) {
      this.scope.camera.circle(this.position.x - o_x, this.position.y - o_y, this.config.vision, "yellow");
      for (const [index, rule] of Object.entries(this.rules)) {
        this.scope.camera.scope.context.strokeStyle = rule.color;
        this.scope.camera.scope.context.beginPath();
        this.scope.camera.scope.context.moveTo(this.position.x - o_x, this.position.y - o_y);
        this.scope.camera.scope.context.lineTo(this.position.x + rule.vector_res.x*20 - o_x, this.position.y + rule.vector_res.y*20 - o_y);
        this.scope.camera.scope.context.stroke();
      }
    }
  }
}
