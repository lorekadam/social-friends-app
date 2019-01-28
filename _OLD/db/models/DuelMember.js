const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const DuelMember = sequelize.define(
    'duel_member',
    {
      uniqid: {
        type: DataTypes.UUID,
        defaultValue: uuidv4()
      },
      name: {
        type: DataTypes.STRING,
        unique: true
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
          fields: ['userId']
        },
        {
          unique: true,
          fields: ['teamId']
        }
      ]
    }
  );
  DuelMember.associate = (models) => {
    DuelMember.belongsTo(models.Duel);
    DuelMember.belongsTo(models.User);
    DuelMember.belongsTo(models.Team);
  };
  return DuelMember;
};
