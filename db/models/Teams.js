const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Team;
};
