(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Cursor = require('./modules/cursor.js');

var cursor = new Cursor();

view.onMouseMove = function (event) {
  cursor.moveTo(event.point);
}

},{"./modules/cursor.js":2}],2:[function(require,module,exports){
var Cursor = Group.extend({
  initialize: function () {
    var hand = new Shape.Rectangle(0, 0, 40, 40);
    hand.fillColor = 'rgb(255, 0, 0)';

    Group.prototype.initialize.call(this);

    this.addChild(hand);
  },

  moveTo: function (point) {
    this.position = point - this.bounds.size / 2;
  }
});

module.exports = Cursor;

},{}]},{},[1])