var Timer = Group.extend({
  initialize: function (position, milliseconds) {
    this.startTime = (new Date()).getTime();
    this.duration = milliseconds;

    var circle = new Shape.Circle(position, 54 / 2 + 2);
        circle.strokeColor = 'black';
        circle.strokeWidth = 2;

    Group.prototype.initialize.call(this, [circle]);
  },

  drawSlice: function (center, radius, angle, percentage) {
    var circumfrence = 360 * percentage;
    var from = new Point({ angle: angle, length:radius });
    var through = center + new Point({ angle: angle + circumfrence/2, length: radius });
    var to = center + new Point({ angle: angle + circumfrence, length: radius });
    var path = new Path();
        path.add(center);
        path.lineBy(from);
        path.arcTo(through, to);
        path.closePath();
        path.fillColor = 'black';
        path.data = percentage;
        path.name = "slice";

    return path;
  },

  elapsedPercentage: function () {
    return ((new Date()).getTime() - this.startTime) / this.duration;
  },

  start: function () {
    this.emit("started");

    this.on("frame", function () {
      var percentage = this.elapsedPercentage();

      if (percentage >= 1) return this.end();
      if (typeof this.slice !== "undefined") this.slice.remove();

      this.slice = this.drawSlice(this.position, 26, -90, percentage)
      this.addChild(this.slice);
    });
  },

  end: function () {
    this.off("frame");
    this.emit("ended");
  }
});

module.exports = Timer;