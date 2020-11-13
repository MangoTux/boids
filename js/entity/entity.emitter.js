class Emitter extends Creature {
  constructor(scope, x, y) {
    super(scope);
    this.position = {
      x: x,
      y: y,
      z: 0,
    };
    this.last_emit = 0;
    this.current_time = 0;
    this.rate = .125;
    this.entities_spawned = 0;
    this.max_entities = 5;
  }

  render(o_x, o_y) {
    this.scope.camera.circle(this.position.x - o_x, this.position.y - o_y, 10, "blue");
  }

  update() {
    super.update();
    if (this.entities_spawned >= this.max_entities) {
      return;
    }
    this.current_time += this.dt;
    if (this.current_time - this.last_emit > this.rate) {
      this.entities_spawned++;
      this.scope.entities.boids.push(
        new Boid(this.scope, this.position.x, this.position.y, this.position.z)
      );
      this.last_emit = this.current_time;
    }
  }
}
