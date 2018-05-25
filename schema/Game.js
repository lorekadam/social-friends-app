const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  player: {
    type: String
  },
  team: {
    type: String
  },
  score: {
    type: Number
  },
  shots: {
    type: Number
  },
  shotsOnTarget: {
    type: Number
  },
  possession: {
    type: Number
  },
  tackles: {
    type: Number
  },
  fouls: {
    type: Number
  },
  yellow: {
    type: Number
  },
  red: {
    type: Number
  },
  injuries: {
    type: Number
  },
  offsides: {
    type: Number
  },
  corners: {
    type: Number
  },
  shotsAccuracy: {
    type: Number
  },
  passAccuracy: {
    type: Number
  }
});

const GameSchema = new mongoose.Schema({
  home: {
    type: PlayerSchema
  },
  away: {
    type: PlayerSchema
  }
});

module.exports = mongoose.model('Game', GameSchema);
