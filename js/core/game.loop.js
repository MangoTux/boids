function gameLoop(scope) {
  var loop = this;
  var fps = global_config.fps,
      fps_interval = 1000 / fps,
      before = window.performance.now(),
      cycles = {
        new: {
          frame_count: 0,
          start_time: before,
          since_start: 0
        },
        old: {
          frame_count: 0,
          start_time: before,
          since_start: 0
        }
      },
      resetInterval = 5,
      resetState = 'new';

  loop.fps = 0;

  loop.main = function mainLoop(tframe) {
    loop.stopLoop = window.requestAnimationFrame(loop.main);
    var now = tframe,
        elapsed = now - before,
        active_cycle, target_reset_interval;
    if (elapsed > fps_interval) {
      before = now - (elapsed % fps_interval);
      for (var calc in cycles) {
        ++cycles[calc].frame_count;
        cycles[calc].since_start = now - cycles[calc].start_time;
      }
      active_cycle = cycles[resetState];
      loop.fps = Math.round(1000 / (active_cycle.since_start / active_cycle.frame_count) * 100) / 100;
      target_reset_interval = (cycles.new.frame_count === cycles.old.frame_count
                            ? resetInterval * fps
                            : (resetInterval * 2) * fps);
      if (active_cycle.frame_count > target_reset_interval) {
        cycles[resetState].frame_count = 0;
        cycles[resetState].start_time = now;
        cycles[resetState].since_start = 0;
        resetState = (resetState === 'new' ? 'old' : 'new');
      }
      scope.loop_update(now);
      scope.loop_render();
    }
  };

  loop.main();

  return loop;
}
