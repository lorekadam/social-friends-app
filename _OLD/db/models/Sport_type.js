const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const SportType = sequelize.define('sport_type', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return SportType;
};
