var Grid = Group.extend({
  initialize: function (position, children, options) {
    var columns = options.columns;
    var rows = options.rows;
    var cellSize = options.cellSize;

    Group.prototype.initialize.call(this);

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var leftOffset = cellSize.width * (i % columns);
      var topOffset = cellSize.height * Math.floor(i / columns);
      this.addChild(child);

      child.position = new Point(leftOffset, topOffset);
    }

    this.position = position;
  }
});

module.exports = Grid;
