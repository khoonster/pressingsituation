var constructN = require('ramda/src/constructN');
var map = require('ramda/src/map');
var shuffle = require('lodash.shuffle');

var explosionSVG = document.getElementById('explosions');
var explosionGroup = project.importSVG(explosionSVG);
var explosions = map(constructN(1, paper.Symbol))(explosionGroup.children.slice());

var Minefield = Group.extend({
  initialize: function () {
    Group.prototype.initialize.apply(this, arguments);

    this.currentScale = 1;
  },

  explode: function (position) {
    var explosion = shuffle(explosions)[0].place(position);

    explosion.scale(this.currentScale);

    this.addChild(explosion);

    return explosion;
  },

  scale: function (amount) {
    Group.prototype.scale.apply(this, arguments);

    this.currentScale = this.currentScale * amount;
  }
});

module.exports = Minefield;
