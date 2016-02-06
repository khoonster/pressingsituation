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
