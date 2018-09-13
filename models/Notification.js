module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
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
  });
  Notification.associate = (models) => {
    // 1:M
    Notification.belongsTo(models.User, {
      foreignKey: 'receiver'
    });
    // 1:M
    Notification.belongsTo(models.User, {
      foreignKey: 'author'
    });
  };
  return Notification;
};
