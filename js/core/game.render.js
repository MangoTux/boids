function gameRender(scope) {
  return function render() {
    scope.context.fillStyle = "black";
    scope.context.fillRect(0, 0, global_config.game_window_width, global_config.game_window_height);
    scope.context.font = '14px Arial';


    scope.camera.render();
    if (global_config.debug) {
        scope.context.fillStyle = '#0f0';
        scope.context.fillText(Math.round(scope.loop.fps), global_config.game_window_width - 20, 15);
    }
  }
}
