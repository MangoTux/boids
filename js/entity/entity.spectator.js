class Spectator extends Creature {
  constructor(scope) {
    super(scope);
    this.following_index = 0;
    this.consumed = {
      right: false,
      left: false,
    };
  }

  render(o_x, o_y) { return; }

  detach() {
    this.scope.entities.boids[this.following_index].active = false;
  }

  attach() {
    this.scope.entities.boids[this.following_index].active = true;
    this.scope.camera.follow(this.scope.entities.boids[this.following_index]);
  }

  update() {
    if (keys.isPressed.right() && !this.consumed.right) {
      this.consumed.right = true;
      this.detach();
      this.following_index++;
      this.following_index %= this.scope.getEntities().length;
      this.attach();
    } else if (!keys.isPressed.right() && this.consumed.right) {
      this.consumed.right = false;
    }
    if (keys.isPressed.left() && !this.consumed.left) {
      this.consumed.left = true;
      this.detach();
      this.following_index--;
      this.following_index += this.scope.getEntities().length;
      this.following_index %= this.scope.getEntities().length;
      this.attach();
    } else if (!keys.isPressed.left() && this.consumed.left) {
      this.consumed.left = false;
    }
    super.update();
  }
}
