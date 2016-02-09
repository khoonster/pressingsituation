var Timer = Group.extend({
  initialize: function (position, milliseconds) {
    this.running = false;

    this.startTime = (new Date()).getTime();
    this.duration = milliseconds;

    this.circle = new Shape.Circle(new Point(0, 0), 54 / 2 + 2);
    this.circle.fillColor = 'white';
    this.circle.strokeColor = 'black';
    this.circle.strokeWidth = 2;

    this.jitter = new Point(0, 0);
    this.jitterPercentageStart = 0.6;

    Group.prototype.initialize.call(this, [this.circle]);

    this.on("started", function () {
      this.running = true;
    });

    this.on("stopped", function () {
      this.running = false;
    });
  },

  drawSlice: function (center, radius, angle, percentage) {
    var circumfrence = 360 * percentage;
    var from = new Point({ angle: angle, length: radius });
    var through = center + new Point({ angle: angle + circumfrence / 2, length: radius });
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

      if (typeof this.slice !== "undefined") this.slice.remove();

      if (percentage >= this.jitterPercentageStart) {
        this.position -= this.jitter;
        this.jitter = Point.random() * (Math.max(percentage - this.jitterPercentageStart, 0) * 20);
        this.position += this.jitter;
      }

      if (percentage >= 1) {
        this.end();
        this.circle.fillColor = 'black';
      } else {
        this.slice = this.drawSlice(this.position, 29, -90, percentage)
        this.addChild(this.slice);
      }
    });
  },

  end: function () {
    this.emit("ended");
    this.stop();
  },

  stop: function () {
    this.off("frame");
    this.emit("stopped");
    this.position -= this.jitter;
  },

  setPosition: function () {
    console.log('foo');
  }
});

module.exports = Timer;
