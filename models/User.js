const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validations = require('../helpers/validations');
const msg = require('../helpers/messages');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    validate: {
      validator: (username) => validations.username(username),
      message: msg.auth.username
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (email) => validations.email(email),
      message: msg.auth.email
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (password) => password.length > 3,
      message: msg.auth.password
    }
  },
  active: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    required: true
  },
  friends: [
    {
      friendId: {
        type: Schema.Types.ObjectId
      },
      friendName: {
        type: String
      },
      accepted: {
        type: Boolean,
        default: false
      }
    }
  ],
  notifications: [
    {
      message: {
        type: String
      },
      type: {
        type: String
      },
      read: {
        type: Boolean,
        default: false
      }
    }
  ],
  duels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'duel'
    }
  ],
  tournaments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tournament'
    }
  ],
  ligues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ligue'
    }
  ]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
