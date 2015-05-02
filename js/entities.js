import Timer from 'timer';

var Entities = {};

Entities.Jumper = class Jumper {
  constructor(options) {
    this.sprite = new Sprite(options);

    this.blocks = options.blocks || [];

    this.timer = new Timer();

    this.x = options.canvas.width / 7;
    this.y = options.y || 0;

    this.width = 32;
    this.height = 32;

    this.speed = {x: 0, y: 0};
    this.gravity = options.gravity || 2800;
  }

  _applyGravity() {
    var elapsed = this.timer.elapsed();

    // Update speed
    this.speed.y += (this.gravity * elapsed) / 1000;

    // The y movement difference
    var dy = this.speed.y * elapsed / 1000;

    this.y += dy;

    this.blocks.forEach(block => {
      if (this._collides(block)) {
        // FIXME this only handles collisions that come from the bottom
        this.y = block.y - this.height;
        this.speed.y = 0;
      }
    });

    this.timer.reset();
  }

  _collides(block) {
    return (this.x < (block.x + block.width) &&   // this.left < block.right
            (this.x + this.width) > block.x &&    // this.right > block.left
            this.y < (block.y + block.height) &&  // this.top < block.bottom
            (this.y + this.height) > block.y);    // this.bottom > block.top
  }

  /*
   *  Public API
   */

  draw() {
    this.sprite.draw(this.x, this.y);
    this.blocks.forEach(block => {
      block.draw();
    });
    this._applyGravity();
  }

  jump() {
    this.speed.y = -900;
  }
}

Entities.Block = class Block {
  constructor(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;

    this.width = (options.width * 32) || 0;
    this.height = (options.height * 32) || 320;

    this.context = options.canvas.getContext('2d');
  }

  draw() {
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }
}

export default Entities;
