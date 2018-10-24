module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    'friendship',
    {
      accepted: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      description: {
        type: DataTypes.TEXT
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['friendId_1']
        },
        {
          unique: true,
          fields: ['friendId_2']
        }
      ]
    }
  );
  Friend.associate = (models) => {
    // 1:M
    Friend.belongsTo(models.User, {
      foreignKey: 'friendId_1'
    });
    // 1:M
    Friend.belongsTo(models.User, {
      foreignKey: 'friendId_2'
    });
  };
  return Friend;
};
