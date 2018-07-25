const GameModel = require('../../models/Game');

const GameQueries = `
  games(_id:String): [Game]
`;

const GameTypes = `
  type PlayerStats {
    type: String,
    score: Int,
    shots: Int,
    shotsOnTarget: Int,
    possession: Int,
    tackles: Int,
    fouls: Int,
    yellow: Int,
    red: Int,
    injuries: Int,
    offsides: Int,
    corners: Int,
    shotsAccuracy: Int,
    passAccuracy: Int
  }
  type Game {
    _id: String,
    homePlayer: String,
    home: PlayerStats,
    awayPlayer: String,
    away: PlayerStats,
    score: String
  }
`;

const GameMutations = `
  addGame(homePlayer: String, awayPlayer: String): Game
,`;

const GameResolvers = {
  Query: {
    games: (root, args) => {
      return GameModel.find({ homePlayer: args._id });
    }
  },
  Mutation: {
    addGame: (root, args) => {
      let newGame = new GameModel({
        homePlayer: args.homePlayer,
        awayPlayer: args.awayPlayer
      });
      return newGame.save();
    }
  }
};

module.exports = {
  GameQueries,
  GameTypes,
  GameMutations,
  GameResolvers
};
