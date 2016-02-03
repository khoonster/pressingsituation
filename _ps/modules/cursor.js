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
