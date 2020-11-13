// With thanks: http://www.vergenet.net/~conrad/boids/pseudocode.html
class Egg extends Creature {
  constructor(scope, x, y, z) {
    super(scope, x, y, z);
    this.incubation = 0;
    this.config = {
      incubation_period: 5 + Math.random() * 3 - 1.5,
    };
  }

  hatch() {
    this.scope.entities.boids.push(
      new Boid(this.scope, this.position.x, this.position.y, this.position.z)
    );
    // Genotype
    this.scope.deleteEntity("eggs", this.id);
  }

  // Rough fly update if idle
  update() {
    super.update();
    this.incubation += this.dt;
    if (this.config.incubation_period <= this.incubation) {
      this.hatch();
      return;
    }
  }

  // This is currently abstracted to a 2d projection;
  // Will update based on relative camera positioning and depth.
  render(o_x, o_y) {
    this.scope.camera.scope.context.fillStyle = "#f0ead6";
    this.scope.camera.scope.context.beginPath();
    this.scope.camera.scope.context.arc(this.position.x - o_x, this.position.y - o_y, 4, 0, Math.TAU);
    this.scope.camera.scope.context.fill();
  }
}
