module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define('Competition', {
    uniqid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      uniqie: true
    },
    description: {
      type: DataTypes.TEXT
    }
  });
  return Competition;
};
