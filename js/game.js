class Game {
  constructor() {
    this.container = document.getElementById('container');
    this.viewport = generateCanvas(global_config.game_window_width, global_config.game_window_height);
    this.viewport.id = "game_instance";

    this.container.insertBefore(this.viewport, this.container.firstChild);
    this.scene_manager = new SceneManager(this);
    this.active_scene = null;
  }

  startGame() {
    this.active_scene = this.scene_manager.load(this.scene_manager.level_loader);
    this.active_scene.load(this);
    this.active_scene.setId(this.scene_manager.level_loader)
  }

  changeScene() {
    let id = null;
    if (this.active_scene == null) {
      id = this.scene_manager.level_loader;
    } else if (this.active_scene.id == this.scene_manager.level_loader) {
      id = this.scene_manager.level_boidbox;
      this.active_scene.stop();
    }
    this.active_scene = this.scene_manager.load(id);
    this.active_scene.setId(id);
    this.active_scene.load(this);
  }
}

window.game = new Game(
  global_config.game_window_width * 10,
  global_config.game_window_height,
  global_config.fps,
  global_config.debug
);
