var constructN = require('ramda/src/constructN');
var map = require('ramda/src/map');
var shuffle = require('lodash.shuffle');

var Button = require('./button.js');

var explosionSVG = document.getElementById('explosions');
var explosionGroup = project.importSVG(explosionSVG);
var explosions = map(constructN(1, paper.Symbol))(explosionGroup.children.slice());

var LosingButton = Button.extend({
  doClick: function () {
    this.explosion = shuffle(explosions)[0].place(this.position);

    this.parent.addChild(this.explosion);

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
