function getPixelRatio(context) {
  var backingStores = [
    'webkitBackingStorePixelRatio',
    'mozBackingStorePixelRatio',
    'msBackingStorePixelRatio',
    'oBackingStorePixelRatio',
    'backingStorePixelRatio'
  ];

  var deviceRatio = window.devicePixelRatio;

  var backingRatio = backingStores.reduce(function(prev, curr) {
    return (context.hasOwnProperty(curr) ? context[curr] : 1);
  });

  return deviceRatio / backingRatio;
}
function generateCanvas() {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d');
  var ratio = this.getPixelRatio(context);

  canvas.width = Math.round(global_config.game_window_width * ratio);
  canvas.height = Math.round(global_config.game_window_height * ratio);
  canvas.style.width = global_config.game_window_width + 'px';
  canvas.style.height = global_config.game_window_height + 'px';
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return canvas;
}
function project(p, x, y, z, depth, w, h, o_w) {
  // TODO projections aren't working correctly
  p.camera.x = (p.world.x || 0) - x;
  p.camera.y = (p.world.y || 0) - y;
  p.camera.z = (p.world.z || 0) - z;
  p.screen.scale = depth/p.camera.z;
  p.screen.x = Math.round((w/2) + p.screen.scale * p.camera.x * w/2);
  p.screen.y = Math.round((h/2) - (p.screen.scale * p.camera.y * h/2));
  p.screen.w = Math.round(p.screen.scale * o_w * w/2);
  return p;
}
