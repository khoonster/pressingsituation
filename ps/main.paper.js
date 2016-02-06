(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Button = require('./modules/button.js');
var Cursor = require('./modules/cursor.js');
var hijackViewMousePosition = require('./modules/hijack_view_mouse_position.js');

var button = new Button(view.bounds.center);

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

},{"./modules/button.js":2,"./modules/cursor.js":3,"./modules/hijack_view_mouse_position.js":4}],2:[function(require,module,exports){
var Button = Group.extend({
  initialize: function (point) {
    var top = new Shape.Rectangle(new Point(0, 0), new Size(54, 54));
        top.fillColor = '#ff4600';

    var sides = new Path([
      new Point(0, 0),
      new Point(0, 54),
      new Point(9, 63),
      new Point(63, 63),
      new Point(63, 9),
      new Point(54, 0)
    ]);

    sides.closed = true;
    sides.fillColor = '#FF1E00';

    var bottom = new Shape.Rectangle(new Point(9, 9), new Size(54, 54));
        bottom.fillColor = '#FF1E00';

    Group.prototype.initialize.call(this, [bottom, sides, top]);

    top.on('click', function () {
      top.visible = false;
      sides.visible = false;
    });

    this.position = point;
  }
});

module.exports = Button;

},{}],3:[function(require,module,exports){
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
  },

  _hitTest: function() {
    return false;
  }
});

module.exports = Cursor;

},{}],4:[function(require,module,exports){
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