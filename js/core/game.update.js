function gameUpdate(scope) {
  return function update (tFrame) {
    scope.camera.update();
    let scene = scope || {};
    if (!scene.hasOwnProperty('entities')) {
      return scene;
    }
    for (const [index, entity] of Object.entries(scene.entities)) {
      if (Array.isArray(entity)) {
        for (let subentity in entity) {
          //subentity.update();
          scene.entities[index][subentity].update();
        }
        continue;
      }
      scene.entities[index].update();
    }
  }
}
