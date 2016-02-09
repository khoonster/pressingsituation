'use strict';

var TIMEOUT = 60000;
var COLUMNS = 24;
var ROWS = 12;
var CELLS = COLUMNS * ROWS;

var construct       = require('ramda/src/construct');
var drop            = require('ramda/src/drop');
var invoker         = require('ramda/src/invoker');
var map             = require('ramda/src/map');
var shuffle         = require('lodash.shuffle');
var take            = require('ramda/src/take');
var times           = require('ramda/src/times');

var Cursor          = require('./modules/cursor.js');
var Grid            = require('./modules/grid.js');
var LosingButton    = require('./modules/losing_button.js');
var Timer           = require('./modules/timer.js');
var WinningButton   = require('./modules/winning_button.js');

var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var cursor = new Cursor();
var timer = new Timer(view.bounds.center, TIMEOUT);

var losers = times(construct(LosingButton, view.bounds.center), CELLS - 1);
var winner = new WinningButton(view.bounds.center);
var buttons = losers.concat([winner]);

var grid = new Grid(view.bounds.center, shuffle(buttons), {
  columns: COLUMNS,
  rows: ROWS,
  cellSize: new Size(58, 58)
})

var gamefield = new Group([grid, timer, cursor]);

winner.on('mouseup', function () {
  map(invoker(0, 'deactivate'), losers);
  timer.stop();
});

timer.on('ended', function () {
  map(invoker(0, 'press'), take(125, losers));
  map(invoker(0, 'disable'), drop(125, losers));
  winner.press();
});

view.on('resize', function (event) {
  var padding = new Size(40, 40);

  var gridSize = grid.bounds;
  var windowSize = event.size;
  var maxGridSize = windowSize - new Size(padding.height, 120);
  var widthScale = maxGridSize.width / gridSize.width;
  var heightScale = maxGridSize.height / gridSize.height;

  var scale = Math.min(widthScale, heightScale);

  cursor.scale(scale)
  grid.scale(scale);
  grid.position = view.bounds.bottomCenter - new Point(0, grid.bounds.height / 2 + 20);

  var headerSize = view.size - (grid.bounds.size + padding);

  timer.position = new Point(view.center.x, headerSize.height / 2 + padding.height / 4)
});

view.on('mousemove', function (event) {
  cursor.moveTo(event.point);
});

hijackViewMousePosition(view, function (event) {
  if (timer.running) {
    return Point.random() * 3;
  } else {
    return new Point(0, 0);
  }
});

timer.start();
