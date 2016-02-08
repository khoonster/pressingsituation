var Button = Group.extend({
  topColor: '#ff4600',
  rightSideColor: '#FF1E00',
  pressedColor: '#FF1E00',

  initialize: function (point) {
    var that = this;

    this.top = new Shape.Rectangle(new Point(0, 0), new Size(54, 54));
    this.top.fillColor = this.topColor;

    this.sides = new Path([
      new Point(0, 0),
      new Point(0, 54),
      new Point(9, 63),
      new Point(63, 63),
      new Point(63, 9),
      new Point(54, 0)
    ]);

    this.sides.closed = true;
    this.sides.fillColor = this.rightSideColor;

    this.bottom = new Shape.Rectangle(new Point(9, 9), new Size(54, 54));
    this.bottom.fillColor = this.pressedColor;

    Group.prototype.initialize.call(this, [this.bottom, this.sides, this.top]);

    this.top.on('click', function () {
      that.press();
      that.doClick();
    });

    this.position = point;
  },

  doClick: function () {},

  press: function () {
    this.top.visible = false;
    this.sides.visible = false;
  }
});

module.exports = Button;
