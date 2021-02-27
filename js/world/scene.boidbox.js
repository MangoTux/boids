class BoidboxScene extends Scene {
  constructor(scope) {
    super(scope);
    this.camera = new Camera3D(this);
    this.width = 800;
    this.height = 600;
    this.depth = 1; // Not in use yet
    this.segments = [];
    this.entities = {};
  }

  load() {
    // Eventually, modify this to have separate colonies
    this.entities.spectator = new Spectator(this);
    this.entities.boids = [];
    this.entities.boid_emitters = [];
    for (let i = 0; i < this.width; i += this.width / 5) {
      this.entities.boid_emitters.push(
        new Emitter(this, i + (this.width / 10), this.height / 2)
      );
    }
    this.entities.eggs = [];
    for (let i = 0; i < 5; i++) {
      this.entities.eggs.push(
        new Egg(this, Math.randomInt(0, this.width), Math.randomInt(0, this.height), 0)
      );
    }
  }

  deleteEntity(type, uuid) {
    for (let i in this.entities[type]) {
      if (this.entities[type][i].id == uuid) {
        this.entities[type].splice(i, 1);
        return;
      }
    }
  }

  getEntities() {
    return this.entities.boids; // I guess?
  }
}
