module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Team;
};
