module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define(
    'teams_members',
    {
      uniqid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
