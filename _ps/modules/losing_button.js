var Button = require('./button.js');

var LosingButton = Button.extend({
  initialize: function (position, minefield) {
    Button.prototype.initialize.call(this, position);

    this.minefield = minefield;
  },

  doClick: function () {
    this.explosion = this.minefield.explode(this.position);

    this.explosion.on('mousedrag', function (event) {
      this.position += event.delta;
    })
  },

  deactivate: function () {
    this.disable();

    if (typeof this.explosion !== "undefined") this.explosion.remove();
  }
});

module.exports = LosingButton;
