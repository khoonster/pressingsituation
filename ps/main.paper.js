(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  var wiggleLength = 7;
  var wiggleSpeed = wiggleLength;
  var xWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength;
  var yWiggle = Math.sin((2 * Math.PI / wiggleSpeed) * event.count) * wiggleLength / 4;

  return new Point(xWiggle, yWiggle);
});

},{"./modules/cursor.js":2,"./modules/hijack_view_mouse_position.js":3}],2:[function(require,module,exports){
var Cursor = Group.extend({
  initialize: function () {
    Group.prototype.initialize.call(this);

    var cursorSVG = document.getElementById('cursor');

    this.clickZoneOffset = new Size(10, -10);

    this.importSVG(cursorSVG);
  },

  moveTo: function (point) {
    this.cursorPosition = new Point(point);

    this.updatePosition();
  },

  updatePosition: function () {
    this.position = this.cursorPosition + this.offset();
  },

  offset: function () {
    return new Size(
      this.bounds.size.width / -2,
      this.bounds.size.height / 2
    ) + this.clickZoneOffset;
  },

  focusPoint: function () {
    return this.cursorPosition + this.wiggleOffset;
  }
});

module.exports = Cursor;

},{}],3:[function(require,module,exports){
module.exports = function hijackViewMousePosition(view, offsetFn) {
  var oldEventHandler = view._handleEvent;

  var wiggle = new Point(0, 0);
  var realPosition = new Point(-9999999, 0);

  view.on('frame', function (event) {
    wiggle = offsetFn.call(this, event);

    view._handleEvent('mousemove', realPosition, event);
  });

  view._handleEvent = function (type, point, event) {
    realPosition = point;
    point = point + wiggle;

    oldEventHandler.call(view, type, point, event);
  }
}

},{}]},{},[1])