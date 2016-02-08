'use strict';

var times = require('ramda/src/times');
var construct = require('ramda/src/construct');
var invoker = require('ramda/src/invoker');
var map = require('ramda/src/map');
var drop = require('ramda/src/drop');
var take = require('ramda/src/take');
var shuffle = require('lodash.shuffle');

var LosingButton = require('./modules/losing_button.js');
var WinningButton = require('./modules/winning_button.js');
var Cursor = require('./modules/cursor.js');
var Grid = require('./modules/grid.js');
var Timer = require('./modules/timer.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var cursor = new Cursor();
var timer = new Timer(view.bounds.center - new Point(0, 324), 60000);

var losers = times(construct(LosingButton, view.bounds.center), 287);
var winner = new WinningButton(view.bounds.center);
var buttons = losers.concat([winner]);

winner.on('mouseup', function () {
  map(invoker(0, 'disable'), losers);
  timer.stop();
});

timer.on('ended', function () {
  map(invoker(0, 'press'), take(100, losers));
  map(invoker(0, 'disable'), drop(100, losers));
});

var grid = new Grid(view.bounds.center + new Point(0, 63), shuffle(buttons), {
  columns: 24,
  rows: 12,
  cellSize: new Size(58, 58)
})

var gamefield = new Group([grid, timer, cursor]);

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
