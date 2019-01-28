const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define(
    'team_member',
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
          fields: ['userId']
        },
        {
          unique: true,
          fields: ['teamId']
        }
      ]
    }
  );
  TeamMember.associate = (models) => {
    TeamMember.belongsTo(models.Team);
    TeamMember.belongsTo(models.User);
  };
  return TeamMember;
};
