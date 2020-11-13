class SceneManager {
  constructor(scope) {
    this.scope = scope;
    this.scene_list = [];
    this.level_loader = "loader";
    this.level_boidbox = "boidbox";
  }

  load(id) {
    switch (id) {
      case this.level_loader: return new LoadingScene(this.scope);
      case this.level_boidbox: return new BoidboxScene(this.scope);
    }
  }
}
