import {Jumper, Block, BlockSpawner} from 'entities';


$(document).ready(function() {
  var canvas = document.getElementById('canvas');

  var onResize = function() {
    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();
  };
  onResize();
  $(window).resize(onResize);

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
  var loop = function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Attach spawner blocks to the jumper
    jumper.blocks = spawner.blocks;
    jumper.draw();

    // Try to spawn blocks
    spawner.run();
  };
  setInterval(loop, 20);

  // Event Handling
  var jump = jumper.jump.bind(jumper);
  $(window).keypress(jump);
  $(window).click(jump);
});
