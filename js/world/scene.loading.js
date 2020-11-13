class LoadingScene extends Scene {
  constructor(scope) {
    super(scope);
    this.width = global_config.game_window_width;
    this.height = global_config.game_window_height;
    this.entities = {}

    this.script_list = [
      'util/util.config.keyboard.js',
      'util/util.config.controller.js',
      'util/util.keyboard.js',
      'util/util.math.js',
      'util/util.vector.js',
      'core/game.camera.3d.js',
      'entity/entity.creature.js',
      'entity/entity.spectator.js',
      'entity/entity.emitter.js',
      'entity/entity.egg.js',
      'entity/entity.boid.js',
      'world/scene.boidbox.js',
    ];
    this.total_script_count = this.script_list.length;
    this.loaded_scripts = 0;
  }

  load() {
    for (let i in this.script_list) {
      this._loadScript('js/'+this.script_list[i], document.body, () => {(++this.loaded_scripts == this.total_script_count) ? this.game.changeScene() : null;});
    }
    this.entities.loader = this;
  }

  _loadScript(url, location, onloadCallback) {
    let s = document.createElement('script');
    s.src = url;
    s.type = 'text/javascript';
    s.async = false;
    s.onload = onloadCallback;
    s.onreadystatechange = onloadCallback;
    location.append(s);
  };

  render() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, global_config.game_window_width, global_config.game_window_height);
    this.context.fillStyle = "#888";
    this.context.fillRect(250, 250, 300, 50);
    this.context.fillStyle = "#64e894";
    let width = 300 - 2 * 5* (this.loaded_scripts / this.total_script_count);
    this.context.fillRect(255, 255, width, 40);
  }
}
