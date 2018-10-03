const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randtoken = require('rand-token');
const { User } = require('../db/models/User');
const config = require('../config/config');
const msg = require('../helpers/messages');
const db = require('../db/models');

const tokenExpire = 86400;

module.exports.register = (req, res) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(200).send({ error: true, msg: msg.auth.required });
  } else if (req.body.password !== undefined && req.body.password.length <= 3) {
    res.status(200).send({ error: true, msg: msg.auth.password });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const refreshToken = randtoken.uid(64);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      refreshToken
    })
      .then((inserted) => {
        const { uniqid, name, email } = inserted.dataValues;
        const token = jwt.sign({ uniqid }, config.secret, {
          expiresIn: tokenExpire
        });
        res.status(200).send({
          auth: true,
          token,
          refreshToken,
          uniqid,
          name,
          email
        });
      })
      .catch((err) => {
        if (err) {
          const error = err.errors[0];
          if (error.type === 'unique violation') {
            return res.status(200).send({ error: true, msg: msg.auth.unique[error.path] });
          }
          return res.status(200).send({ error: true, msg: error.message });
        }
      });
  }
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(200).send({ error: true, msg: msg.basic });
    }
    if (!user) {
      return res.status(200).send({ error: true, msg: msg.auth.noUser });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(200).send({ error: true, msg: msg.auth.login });
    }
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: tokenExpire
    });
    res.status(200).send({
      auth: true,
      token: token,
      refreshToken: user.refreshToken,
      _id: user._id,
      username: user.username,
      email: user.email
    });
  });
};

module.exports.getUser = (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(200).send({ error: true, msg: msg.basic });
    }
    if (!user) {
      return res.status(200).send({ error: true, msg: msg.auth.noUser });
    }
    res.status(200).send(user);
  });
};

module.exports.refreshToken = (req, res) => {
  User.findOne({ email: req.body.email }, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(200).send({ error: true, msg: msg.basic });
    }
    if (req.body.refreshToken === user.refreshToken) {
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: tokenExpire
      });
      const refreshToken = randtoken.uid(64);
      User.findOneAndUpdate({ _id: user._id }, { refreshToken }, (dbErr) => {
        if (dbErr) {
          return res.status(200).send({ error: true, msg: msg.basic });
        }
        res.status(200).send({ auth: true, token: token, refreshToken });
      });
    } else {
      return res.status(200).send({ error: true, msg: msg.auth.token.invalidRefresh });
    }
  });
};
