module.exports = (sequelize) => {
  const Friend = sequelize.define('friend');
  Friend.associate = (models) => {
    // 1:M
    Friend.belongsTo(models.User, {
      foreignKey: 'friendOne'
    });
    // 1:M
    Friend.belongsTo(models.User, {
      foreignKey: 'friendTwo'
    });
  };
  return Friend;
};
