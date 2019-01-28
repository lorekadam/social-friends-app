const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('sport', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  Sport.associate = (models) => {
    // 1:M
    Sport.belongsTo(models.Sport_type, {
      foreignKey: 'type'
    });
  };
  return Sport;
};
