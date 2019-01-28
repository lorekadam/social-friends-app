const { Duel } = require('../../models/Duel');

const DuelQueries = `
  duel(_id:String): [Duel]
`;

const DuelTypes = `
  type Duel {
    _id: String,
    name: String,
    players: Array    
  }
`;

const DuelResolvers = {
  Query: {
    Duels: (root, args) => {
      return Duel.find({ homePlayer: args._id });
    }
  }
};

module.exports = {
  DuelQueries,
  DuelTypes,
  DuelResolvers
};
