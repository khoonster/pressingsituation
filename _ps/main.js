'use strict';

var Cursor = require('./modules/cursor.js');

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

var oldEventHandler = view._handleEvent;

var wiggle = new Point(0, 0);
var realPosition = new Point(-9999999, 0);

view.onFrame = function (event) {
  var xWiggle = Math.sin((2 * Math.PI / 150) * event.count) * 100;
  var yWiggle = Math.sin((2 * Math.PI / 100) * event.count) * 100;

  wiggle = new Point(xWiggle, yWiggle);

  view._handleEvent('mousemove', realPosition, event);
}

view._handleEvent = function (type, point, event) {
  realPosition = point;
  point = point + wiggle;

  oldEventHandler.call(view, type, point, event);
}
