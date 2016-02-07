'use strict';

var times = require('ramda/src/times');
var construct = require('ramda/src/construct');

var Button = require('./modules/button.js');
var Cursor = require('./modules/cursor.js');
var Grid = require('./modules/grid.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var buttons = times(construct(Button, view.bounds.center), 288);

var grid = new Grid(view.bounds.center, buttons, {
  columns: 24,
  rows: 12,
  cellSize: new Size(58, 58)
})

var cursor = new Cursor();

var gamefield = new Group([grid, cursor]);

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

hijackViewMousePosition(view, function (event) {
  var wiggleLength = 7;
  var wiggleSpeed = wiggleLength;
  var xWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength;
  var yWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength / 4;

  return new Point(xWiggle, yWiggle);
});
