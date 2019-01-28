const uuidv4 = require('uuid/v4');
const msg = require('../../helpers/messages');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: '',
      validate: {
        is: {
          args: [/^[a-zA-Z0-9_]+$/i],
          msg: msg.auth.name
        },
        len: {
          args: [3, 16],
          msg: msg.auth.name
        },
        notEmpty: {
          msg: msg.auth.required
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: msg.auth.email
        },
        notEmpty: {
          msg: msg.auth.required
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: msg.auth.required
        }
      }
    },
    refreshToken: {
      type: DataTypes.STRING
    }
  });
  return User;
};
