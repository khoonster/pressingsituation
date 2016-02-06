(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./modules/cursor.js":2}],2:[function(require,module,exports){
var Cursor = Group.extend({
  initialize: function () {
    Group.prototype.initialize.call(this);

    var cursorSVG = document.getElementById('cursor');

    this.clickZoneOffset = new Size(10, -10);
    this.wiggleOffset = new Size(0, 0);

    this.importSVG(cursorSVG);

    this.on('frame', function (event) {
      var xWiggle = Math.sin((2 * Math.PI / 150) * event.count) * 40;
      var yWiggle = Math.sin((2 * Math.PI / 100) * event.count) * 40;

      this.wiggleOffset = new Point(xWiggle, yWiggle);

      this.updatePosition();
    });
  },

  moveTo: function (point) {
    this.cursorPosition = new Point(point);

    this.updatePosition();
  },

  updatePosition: function () {
    this.position = this.cursorPosition + this.offset() + this.wiggleOffset;
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

},{}]},{},[1])