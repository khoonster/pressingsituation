'use strict';

var Cursor = require('./modules/cursor.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var cursor = new Cursor();

var hoverRect = new Shape.Rectangle(view.center, new Size(100, 100));
hoverRect.fillColor = 'blue';
hoverRect.onMouseEnter = function () { this.fillColor = 'red'; };
hoverRect.onMouseLeave = function () { this.fillColor = 'blue'; };

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

view.onMouseDown = function (event) {
  var rect = new Shape.Rectangle(event.point - new Point(5, 5), new Size(10, 10));
  rect.fillColor = 'blue';
}

hijackViewMousePosition(view, function (event) {
  var wiggleLength = 25;
  var wiggleSpeed = wiggleLength;
  var xWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength;
  var yWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength / 4;

  return new Point(xWiggle, yWiggle);
});
