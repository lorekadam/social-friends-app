const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new mongoose.Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'game'
    }
  ]
});

const Tournament = mongoose.model('tournament', TournamentSchema);

module.exports = Tournament;
