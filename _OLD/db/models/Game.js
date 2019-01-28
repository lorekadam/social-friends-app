const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'game',
    {
      uniqid: {
        type: DataTypes.UUID,
        defaultValue: uuidv4()
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['duelId']
        },
        {
          unique: true,
          fields: ['sportId']
        }
      ]
    }
  );
  Game.associate = (models) => {
    Game.belongsTo(models.Duel);
    Game.belongsTo(models.Sport);
  };
  return Game;
};
