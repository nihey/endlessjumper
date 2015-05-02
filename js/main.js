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
    spawnable: [new Block({canvas: canvas, width: 8})],
    blocks: [new Block({canvas: canvas, y: 400, width: canvas.width / 32})],
    boundaries: {
      x: canvas.width,
      y: canvas.height / 2,
      width: 300,
      height: canvas.height / 2,
    }
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
