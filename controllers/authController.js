const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.createUser = (req, res) => {
  console.log(req.body);
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(200).send('Email and password are required.');
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  User.create(
    {
      email: req.body.email,
      password: hashedPassword
    },
    function (err, user) {
      if (err) {
        return res.status(500).send('There was a problem registering the user.');
      }
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
};

exports.getUser = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    res.status(200).send(decoded);
  });
};
