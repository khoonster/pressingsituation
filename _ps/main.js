'use strict';

var Cursor = require('./modules/cursor.js');

var cursor = new Cursor();

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

view.onMouseDown = function (event) {
  var rect = new Shape.Rectangle(event.point - new Point(5, 5), new Size(10, 10));
  rect.fillColor = 'blue';
}

var oldEventHandler = view._handleEvent;

view._handleEvent = function (type, point, event) {
  if (type === 'mousedown' || type === 'mouseup') {
    point = cursor.focusPoint();
  }

  oldEventHandler.call(view, type, point, event)
}
