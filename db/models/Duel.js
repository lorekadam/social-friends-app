module.exports = (sequelize, DataTypes) => {
  const Duel = sequelize.define('duel', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  Duel.associate = (models) => {
    // 1:M
    Duel.belongsTo(models.Sport, {
      foreignKey: 'sportId'
    });
  };
  return Duel;
};
