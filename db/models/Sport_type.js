module.exports = (sequelize, DataTypes) => {
  const SportType = sequelize.define('sport_type', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return SportType;
};
