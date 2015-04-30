$(document).ready(function() {
  var canvas = document.getElementById('canvas');

  var onResize = function() {
    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();
  };
  onResize();
  $(window).resize(onResize);

  var jumper = new Sprite({
    canvas: canvas,
    image: document.getElementById('jumper'),
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnFrequency: 1,
  });

  var loop = function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    jumper.draw(0, 0);
  };

  setInterval(loop, 200);
});
