var S = paper.Symbol;

var topColor = '#ff4600';
var rightSideColor = '#FF1E00';
var bottomSideColor = '#FF3200';
var pressedColor = '#FF1E00';

var size = new Size(54, 54);
var depth = new Size(9, 9);

var rightSide = new Path([
  new Point(                       0,           0),
  new Point(size.width + depth.width, size.height + depth.height),
  new Point(size.width + depth.width,               depth.height),
  new Point(size.width,            0)
]);
    rightSide.closed = true;
    rightSide.fillColor = rightSideColor;
var rightSideSymbol = new S(rightSide);

var bottomSide = new Path([
  new Point(                       0,           0),
  new Point(                       0, size.height),
  new Point(             depth.width, size.height + depth.height),
  new Point(size.width + depth.width, size.height + depth.height)
]);
    bottomSide.closed = true;
    bottomSide.fillColor = bottomSideColor;
var bottomSideSymbol = new S(bottomSide);

var bottom = new Shape.Rectangle(depth, size);
    bottom.fillColor = pressedColor;
var bottomSymbol = new S(bottom);

var top = new Shape.Rectangle(new Point(0, 0), size);
    top.fillColor = topColor;
var topSymbol = new S(top);

var Button = Group.extend({
  initialize: function (point) {
    this.top = topSymbol.place(size / 2);
    this.rightSide = rightSideSymbol.place((size + depth) / 2);
    this.bottomSide = bottomSideSymbol.place((size + depth) / 2);
    this.bottom = bottomSymbol.place((size / 2) + depth);

    Group.prototype.initialize.call(this, [this.bottom, this.bottomSide, this.rightSide, this.top]);

    this.top.on('mouseup', function () {
      this.parent.press();

      Button.clicks += 1;

      this.parent.emit('clicked');
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
    this.rightSide.visible = false;
    this.bottomSide.visible = false;
  }
});

Button.clicks = 0;

module.exports = Button;
