class Camera3D extends Camera {
  constructor(scope) {
    super(scope);
    this.fov = 100;
    this.draw_distance = 300;
    this.fog_density = 0;
    this.height = 1000;
    this.depth = 1 / Math.tan((this.fov/2) * Math.PI/180);
    this.facing = new Vector({
      x: 1,
      y: 1,
      z: 1,
    });
  }

  update() {
    if (this.following !== null) {
      this.position = {
        x: this.following.position.x,
        y: this.following.position.y,
        z: this.following.position.z,
      };
    }
    super.update();
  }

  renderBackground(background) {
    for (let i in background) {
      let layer = background[i];
      let rotation = layer.scroll_offset;
      let offset = layer.offset || 0;
      let scale = layer.scale || 1;
      let img_w = layer.w / 2;
      let img_h = layer.h;
      let src_x = layer.x + Math.floor(layer.w * rotation);
      let src_y = layer.y;
      let src_w = Math.min(img_w, layer.x + layer.w - src_x);
      let src_h = img_h;
      let dst_x = 0;
      let dst_y = offset;
      let dst_w = Math.floor(global_config.game_window_width * (src_w / img_w) * scale);
      let dst_h = global_config.game_window_height * scale;
      // First four parameters are the X, Y, W, and H of the clip for source image. Last 4 are placement
      this.scope.context.drawImage( layer.img, src_x, src_y, src_w, src_h, dst_x, dst_y, dst_w, dst_h);
      if (src_w < img_w) {
        this.scope.context.drawImage( layer.img, layer.x, src_y, img_w-src_w, src_h, dst_w-1, dst_y, global_config.game_window_width-dst_w, dst_h);
      }
    }
  }

  renderEntities(entities) {
    // Normally take in width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown
    for (const [index, entity] of Object.entries(entities)) {
      if (Array.isArray(entity)) {
        for (let subentity of entity) {
          subentity.render(this.o_x, this.o_y);
        }
        continue;
      }
      entity.render(this.o_x, this.o_y);
    }
  }

  render() {
    if (this.scope.hasOwnProperty('background')) {
      this.renderBackground(this.scope.background);
    /*
    Including the backgrounds causes a weird jump that's also present in the Camera2D.
    */
    }
    if (this.scope.hasOwnProperty('entities')) {
      this.renderEntities(this.scope.entities);
    }
  }
}
