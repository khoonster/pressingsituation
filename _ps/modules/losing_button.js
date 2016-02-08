var shuffle = require('lodash.shuffle');

var Button = require('./button.js');

var explosionSVG = document.getElementById('explosions');
var explosions = project.importSVG(explosionSVG);
explosions.visible = false;

var LosingButton = Button.extend({
  doClick: function () {
    this.explosion = shuffle(explosions.children)[0].clone(true);

    this.parent.addChild(this.explosion);
    this.explosion.position = this.position;

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
