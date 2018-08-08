const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerStatsSchema = new mongoose.Schema({
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
  homePlayer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  home: {
    type: PlayerStatsSchema
  },
  awayPlayer: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  away: {
    type: PlayerStatsSchema
  },
  score: {
    type: String
  }
});

const Game = mongoose.model('game', GameSchema);
module.exports = { Game };
