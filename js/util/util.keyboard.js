class KeyboardInputManager {
  constructor() {
    this.isPressed = {};
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;
    this.space = false;
    this.cancel = false;
    this.loadHandlers();
    this.defineProperties();
  }
  loadHandlers() {
    let scope = this;
    // Key pressed behavior
    document.onkeydown = function(ev) {
      switch (ev.keyCode) {
        case controller.LEFT: scope.left = true; break;
        case controller.RIGHT: scope.right = true; break;
        case controller.UP: scope.up = true; break;
        case controller.DOWN: scope.down = true; break;
        case controller.JUMP: scope.space = true; break;
        case controller.CANCEL: scope.cancel = true; break;
        default: return false; // Allow event bubbling for all other inputs
      }
    }

    document.onkeyup = function(ev) {
      switch (ev.keyCode) {
        case controller.LEFT: scope.left = false; break;
        case controller.RIGHT: scope.right = false; break;
        case controller.UP: scope.up = false; break;
        case controller.DOWN: scope.down = false; break;
        case controller.JUMP: scope.space = false; break;
        case controller.CANCEL: scope.cancel = false; break;
        default: return false; // Allow event bubbling for all other inputs
      }
    }
  }
  defineProperties() {
    this.isPressed.left = () => { return this.left }
    this.isPressed.right = () => { return this.right }
    this.isPressed.up = () => { return this.up }
    this.isPressed.down = () => { return this.down }
    this.isPressed.space = () => { return this.space }
    this.isPressed.cancel = () => { return this.cancel }
  }
}
var keys = new KeyboardInputManager();
