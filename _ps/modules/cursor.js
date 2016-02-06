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
