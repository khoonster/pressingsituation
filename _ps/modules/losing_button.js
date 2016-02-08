var shuffle = require('lodash.shuffle');

var Button = require('./button.js');

var explosionSVG = document.getElementById('explosions');
var explosions = project.importSVG(explosionSVG);

var LosingButton = Button.extend({
  doClick: function () {
    var explosion = shuffle(explosions.children)[0].clone(true);

    explosions.remove();

    this.parent.addChild(explosion);
    explosion.position = this.position;

    explosion.on('mousedrag', function (event) {
      this.position += event.delta;
    })
  }
});

module.exports = LosingButton;
