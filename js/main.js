import {Jumper, Block} from 'entities';

$(document).ready(function() {
  var canvas = document.getElementById('canvas');

  var onResize = function() {
    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();
  };
  onResize();
  $(window).resize(onResize);

  var jumper = new Jumper({
    canvas: canvas,
    image: document.getElementById('jumper'),
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnFrequency: 10,
    blocks: [new Block({canvas: canvas, x: 40, y: 300, width: 8}),
             new Block({canvas: canvas, x: 340, y: 100, width: 8})]
  });

  // Main loop
  var loop = function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    jumper.draw();
  };
  setInterval(loop, 20);

  // Event Handling
  var jump = jumper.jump.bind(jumper);
  $(window).keypress(jump);
  $(window).click(jump);
});
