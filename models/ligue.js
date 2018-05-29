const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LigueSchema = new mongoose.Schema({
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

const Ligue = mongoose.model('ligue', LigueSchema);

module.exports = Ligue;
