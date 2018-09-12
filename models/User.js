const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validations = require('../helpers/validations');
const msg = require('../helpers/messages');

const FriendSchema = new mongoose.Schema({
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
});

const NotificationSchema = new mongoose.Schema({
  requestId: {
    type: Schema.Types.ObjectId
  },
  fromId: {
    type: Schema.Types.ObjectId
  },
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
});

const DuelSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

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
  friends: [FriendSchema],
  notifications: [NotificationSchema],
  duels: [DuelSchema],
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
const Friend = mongoose.model('friends', FriendSchema);
const Notification = mongoose.model('notifications', NotificationSchema);

module.exports = { User, Friend, Notification };
