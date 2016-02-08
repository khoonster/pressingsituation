var Button = Group.extend({
  topColor: '#ff4600',
  rightSideColor: '#FF1E00',
  pressedColor: '#FF1E00',

  initialize: function (point) {
    var that = this;

    var size = new Size(54, 54);
    var depth = new Size(9, 9);

    this.top = new Shape.Rectangle(new Point(0, 0), size);
    this.top.fillColor = this.topColor;

    this.sides = new Path([
      new Point(                       0,           0),
      new Point(                       0, size.height),
      new Point(             depth.width, size.height + depth.height),
      new Point(size.width + depth.width, size.height + depth.height),
      new Point(size.width + depth.width,               depth.height),
      new Point(size.width,           0)
    ]);

    this.sides.closed = true;
    this.sides.fillColor = this.rightSideColor;

    this.bottom = new Shape.Rectangle(depth, size);
    this.bottom.fillColor = this.pressedColor;

    Group.prototype.initialize.call(this, [this.bottom, this.sides, this.top]);

    this.top.on('mouseup', function () {
      that.press();
    });

    this.position = point;
  },

  doClick: function () {},

  press: function () {
    this.doClick();
    this.disable();
  },

  disable: function () {
    this.top.visible = false;
    this.sides.visible = false;
  }
});

module.exports = Button;
