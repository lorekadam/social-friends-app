module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'notification',
    {
      uniqid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      message: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      read: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['receiverId']
        },
        {
          unique: true,
          fields: ['authorId']
        }
      ]
    }
  );
  Notification.associate = (models) => {
    // 1:M
    Notification.belongsTo(models.User, {
      foreignKey: 'receiverId'
    });
    // 1:M
    Notification.belongsTo(models.User, {
      foreignKey: 'authorId'
    });
  };
  return Notification;
};
