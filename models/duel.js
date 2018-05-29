const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DuelSchema = new mongoose.Schema({
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

const Duel = mongoose.model('duel', DuelSchema);

module.exports = Duel;
