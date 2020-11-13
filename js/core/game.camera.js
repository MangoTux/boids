class Camera {
  constructor(scope) {
    this.scope = scope;
    this.lerp = global_config.camera_lerp;
    this.lerp_factor = global_config.camera_lerp_factor;
    this.padding = {
      vertical: 64,
      horizontal: 64,
    }
    this.viewport = {
      width: global_config.game_window_width,
      height: global_config.game_window_height,
    };
    // Only used for 3D rendering
    this.fov = 0;
    this.position = {
      x: this.viewport.width/2,
      y: this.viewport.height/2,
    };
    // Offsets for camera location
    this.o_x = 0;
    this.o_y = 0;
    // The target of the camera
    this.following = null;
  }

  follow(entity) {
    this.following = entity;
  }

  polygon(pt_list, fill, color) {
    this.scope.context.fillStyle = color;
    this.scope.context.beginPath();
    this.scope.context.moveTo(pt_list[0].x, pt_list[0].y);
    for (let n = 1; n < pt_list.length; n++) {
      this.scope.context.lineTo(pt_list[n].x, pt_list[n].y);
    }
    this.scope.context.closePath();
    if (fill) { this.scope.context.fill(); }
  }

  circle(x, y, r, color) {
    this.scope.context.beginPath();
    this.scope.context.strokeStyle = color;
    this.scope.context.arc(x, y, r, 0, 2*Math.PI);
    this.scope.context.stroke();
  }

  update() {
    let target = {
      x:this.viewport.width / 2,
      y:this.viewport.height / 2,
    }
    if (this.following !== null) {
      target.x = this.following.position.x;
      target.y = this.following.position.y;
    }
    if (this.lerp) {
      this.position.x += (target.x - this.position.x)*this.lerp_factor;
      this.position.y += (target.y - this.position.y)*this.lerp_factor;
    } else {
      this.position.x = target.x;
      this.position.y = target.y;
    }
    this.o_x = this.position.x - this.viewport.width/2;
    this.o_y = this.position.y - this.viewport.height/2;
  }

  renderEntities(entities) {
    for (let entity of entities) {
      if (Array.isArray(entity)) {
        for (let subentity of entities) {
          // Optimization: Skip an entity if its x + width < bound or x > bound
          subentity.render(this.o_x, this.o_y);
        }
        continue;
      }
      // Optimization: Skip an entity if its x + width < bound or x > bound
      entity.render(this.o_x, this.o_y);
    }
  }

  render() {
    if (!this.scope) { return; }
    // Draw everything in bounds of [this.center.x +- this.viewport[width]/2, this.center.y +- this.viewport[height]/2];
    if (this.scope.hasOwnProperty('entities')) {
      this.renderEntities(this.scope.entities);
    }
  }
}
