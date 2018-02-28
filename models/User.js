const mongoose = require('mongoose');
const validations = require('../helpers/validations');
const msg = require('../helpers/messages');

const UserSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('User', UserSchema);
