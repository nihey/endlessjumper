import Timer from 'timer';

var Entities = {};

Entities.Jumper = class Jumper {
  constructor(options) {
    this.sprite = new Sprite(options);

    this.timer = new Timer();

    this.x = options.canvas.width / 7;
    this.y = options.y || 0;

    this.speed = {x: 0, y: 0};
    this.gravity = options.gravity || 2800;
  }

  _applyGravity() {
    var elapsed = this.timer.elapsed();
    this.speed.y += (this.gravity * elapsed) / 1000;
    this.y += this.speed.y * elapsed / 1000;
    this.timer.reset();
  }

  /*
   *  Public API
   */

  draw() {
    this.sprite.draw(this.x, this.y);
    this._applyGravity();
  }

  jump() {
    this.speed.y = -900;
  }
}

export default Entities;
