const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Duel = sequelize.define('duel', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  Duel.associate = (models) => {
    Duel.belongsTo(models.Sport);
  };
  return Duel;
};
