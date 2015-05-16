import Timer from 'timer';

var Entities = {};

class Collidable {
  collides(collidable) {
    return (this.x < (collidable.x + collidable.width) &&   // this.left < collidable.right
            (this.x + this.width) > collidable.x &&    // this.right > collidable.left
            this.y < (collidable.y + collidable.height) &&  // this.top < collidable.bottom
            (this.y + this.height) > collidable.y);    // this.bottom > collidable.top
  }
}

Entities.Jumper = class Jumper extends Collidable {
  constructor(options) {
    super();
    this.sprite = new Sprite(options);
    this.columnFrequency = options.columnFrequency || 0;

    this.blocks = options.blocks || [];

    this.timer = new Timer();

    this.x = options.canvas.width / 7;
    this.y = options.y || 0;

    this.width = 26;
    this.height = 32;

    this.currentJumps = 0;
    this.maxJumps = 2;

    this.speed = {x: 400, y: 0};
    this.gravity = options.gravity || 2800;

    this.score = 0;
  }

  _applyGravity() {
    var elapsed = this.timer.elapsed();

    // Update speed
    this.speed.y += (this.gravity * elapsed) / 1000;

    // The y movement difference
    var dy = this.speed.y * elapsed / 1000;
    var dx = this.speed.x * elapsed / 1000;

    this.y += dy;

    var revertBlocks = false;
    this.blocks.forEach(block => {
      block.x -= dx;
      if (this.collides(block)) {
        this.y -= dy;
        if(!this.collides(block)) {
          var height = block.height;
          if (this.y < block.y) {
            height = -this.height;
          }

          this.y = block.y + height;
          this.speed.y = 0;
          this.sprite.columnFrequency = this.columnFrequency;
          this.currentJumps = 0;
          return;
        }

        this.y += dy;
        // FIXME Only handles front collisions
        revertBlocks = this.x + this.width - block.x;
      }
    });

    revertBlocks && this.blocks.forEach(block => {
      block.x += revertBlocks;
    });
    this.score += (revertBlocks ? revertBlocks : dx) / 32;

    this.timer.reset();
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
    if (this.currentJumps == this.maxJumps) {
      return;
    }

    this.speed.y = -900;
    this.currentJumps += 1;
    this.sprite.columnFrequency = 0;
    this.sprite.columnIndex = 2;
  }
}

Entities.Block = class Block extends Collidable {
  constructor(options) {
    super();
    this.options = options;

    this.x = options.x || 0;
    this.y = options.y || 0;

    this.width = (options.width * 32) || 0;
    this.height = (options.height * 32) || 320;

    this.image = options.image;

    this.chance = options.chance || 1;

    this.context = options.canvas.getContext('2d');
  }

  copy() {
    return new Block(this.options);
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y)
  }
}

Entities.BlockSpawner = class BlockSpawner {
  constructor(options) {
    this.blocks = options.blocks || [];

    // Where can the block spawn?
    this.boundaries = options.boundaries;

    // Blocks cannot spawn unless all blocks are beyond safeline
    this.safeline = options.safeline || options.boundaries.x;


    // From where the blocks can start to be destroyed
    this.limit = options.limit || -10;

    // Build spawnable array for fast selection
    var spawnable = options.spawnable || [];
    this.spawnable = [];
    spawnable.forEach(block => {
      for(var i = 0; i < block.chance; i++) {
        this.spawnable.push(block);
      }
    });
  }

  /*
   *  Public API
   */

  spawn() {
    var index = Math.round(Math.random() * (this.spawnable.length - 1));
    var spawned = this.spawnable[index].copy();

    // Set the spawned object initial state
    spawned.x = this.boundaries.x + (Math.random() * this.boundaries.width);
    spawned.y = this.boundaries.y + (Math.random() * this.boundaries.height);
    this.blocks.push(spawned);
  }

  run() {
    var spawnable = this.blocks.every(block => block.x + block.width < this.safeline);
    spawnable && this.spawn();

    this.blocks = this.blocks.filter(block => {
      return (block.x + block.width) > this.limit;
    });
  }
}

export default Entities;
