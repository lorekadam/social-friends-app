const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DuelSchema = new mongoose.Schema({
  name: String,
  players: [{ type: Schema.Types.ObjectId }],
  accepted: {
    type: Boolean,
    default: false
  }
});

const Duel = mongoose.model('duel', DuelSchema);

module.exports = { Duel };
