import {Jumper, Block, BlockSpawner} from 'entities';


function reset() {
  var canvas = document.getElementById('canvas');

  // XXX Workaround to make the canvas be 800px maximum wide or fit the device
  // width if it is smaller
  canvas.width = Math.min(800, $(window).width());
  canvas.height = canvas.width * 9 / 16;
  $(canvas).css({
    width: canvas.width,
    height: canvas.height,
  })

  var spawner = new BlockSpawner({
    spawnChance: 0.2,
    spawnable: [
      new Block({canvas: canvas, width: 10, chance: 1, image: $('#platform-10')[0]}),
      new Block({canvas: canvas, width: 5, chance: 4, image: $('#platform-5')[0]}),
      new Block({canvas: canvas, width: 4, chance: 4, image: $('#platform-4')[0]}),
      new Block({canvas: canvas, width: 3, chance: 1, image: $('#platform-3')[0]}),
      new Block({canvas: canvas, width: 2, chance: 1, image: $('#platform-2')[0]}),
    ],
    blocks: [
      new Block({canvas: canvas, width: 10, x: 300, y: 300, image: $('#platform-10')[0]}),
    ],
    boundaries: {
      x: canvas.width,
      y: canvas.height / 2,
      width: 150,
      height: (canvas.height / 2 - 50),
    },
    safeline: canvas.width - 50
  });

  var jumper = new Jumper({
    canvas: canvas,
    image: document.getElementById('jumper'),
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnFrequency: 10,
  });

  // Main loop
  var id = null;
  var loop = function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Attach spawner blocks to the jumper
    jumper.blocks = spawner.blocks;
    jumper.draw();

    // Try to spawn blocks
    spawner.run();

    if (jumper.y > (canvas.height + 50)) {
      clearInterval(id);
      setTimeout(reset, 1);
    }
  };
  id = setInterval(loop, 20);

  // Event Handling
  var jump = jumper.jump.bind(jumper);
  $(window).keypress(jump);
  $(window).on('touchstart', jump);
};

$(document).ready(reset);
