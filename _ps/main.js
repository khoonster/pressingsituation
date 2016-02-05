'use strict';

var Cursor = require('./modules/cursor.js');

var cursor = new Cursor();

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

view.onFrame = function (event) {
  // cursor.rotate(1);
}

console.log(view);
