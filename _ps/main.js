'use strict';

var times = require('ramda/src/times');
var construct = require('ramda/src/construct');
var invoker = require('ramda/src/invoker');
var map = require('ramda/src/map');
var shuffle = require('lodash.shuffle');

var Button = require('./modules/button.js');
var WinningButton = require('./modules/winning_button.js');
var Cursor = require('./modules/cursor.js');
var Grid = require('./modules/grid.js');
var Timer = require('./modules/timer.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var cursor = new Cursor();
var timer = new Timer(view.bounds.center - new Point(0, 324), 60000);

var buttons = times(construct(Button, view.bounds.center), 287);
var winner = new WinningButton(view.bounds.center);

winner.on('click', function () {
  map(invoker(0, 'press'), buttons);
  timer.end();
});

buttons.push(winner);

var grid = new Grid(view.bounds.center + new Point(0, 63), shuffle(buttons), {
  columns: 24,
  rows: 12,
  cellSize: new Size(58, 58)
})

var gamefield = new Group([grid, cursor, timer]);

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

hijackViewMousePosition(view, function (event) {
  if (timer.running) {
    var wiggleLength = 7;
    var wiggleSpeed = wiggleLength;
    var xWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength;
    var yWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength / 4;

    return new Point(xWiggle, yWiggle);
  } else {
    return new Point(0, 0);
  }
});

timer.start();
