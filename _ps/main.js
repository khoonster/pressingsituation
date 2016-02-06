'use strict';

var Button = require('./modules/button.js');
var Cursor = require('./modules/cursor.js');
var Grid = require('./modules/grid.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var button = new Button(view.bounds.center);
var button2 = new Button(view.bounds.center);

var grid = new Grid(view.bounds.center, [button, button2], {
  columns: 13,
  rows: 9,
  cellSize: new Size(60, 60)
})

var cursor = new Cursor();

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
