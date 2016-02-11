module.exports = function hijackViewMousePosition(view, offsetFn) {
  var oldEventHandler = view._handleEvent;

  var wiggle = new Point(0, 0);
  var realPosition = new Point(-9999999, 0);
  var lastWiggle;
  var needsMouseMove = true;

  view.on('mousemove', function () {
    needsMouseMove = false;
  });

  view.on('frame', function (event) {
    wiggle = offsetFn.call(this, event);

    if (wiggle != lastWiggle && needsMouseMove) {
      view._handleEvent('mousemove', realPosition, event);
      lastWiggle = wiggle;
    }

    needsMouseMove = true;
  });

  view._handleEvent = function (type, point, event) {
    realPosition = point;
    point = point + wiggle;

    oldEventHandler.call(view, type, point, event);
  }
}
