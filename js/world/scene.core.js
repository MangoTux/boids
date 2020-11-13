class Scene {
  constructor(scope) {
    this.game = scope;

    this.context = this.game.viewport.getContext('2d');
    this.loop_update = gameUpdate(this);
    this.loop_render = gameRender(this);
    this.loop = gameLoop(this);

    // Performing it this way allows the camera to vary in rendering styles if desired
    this.camera = new Camera(this);

    // All components of the system
    this.background = {};
    this.foreground = {};
    this.entities = {};
  }

  getDt() {
    // TODO reevaluate when more objects are on the screen, and browser idles
    // return Math.min(1 / this.loop.fps, 1/global_config.fps);
    return 1 / this.loop.fps;
  }

  setId(id) {
    this.id = id;
  }

  // Collectin' garbage!
  stop() {
    this.loop_update = () => {};
    this.loop_render = () => {};
    this.loop = () => {};
  }
}
