const { Game } = require('../../models/Game');
const msg = require('../../helpers/messages');

const stats = `
  team: String,
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
`;

const GameQueries = `
  games(_id:String): [Game]
`;

const GameTypes = `
  type PlayerStats {
    ${stats}
  }
  type Game {
    _id: String,
    type: String,
    homePlayer: String,
    home: PlayerStats,
    awayPlayer: String,
    away: PlayerStats,
    score: String
  }
  input StatsToSend {
    ${stats}
  }
`;

const GameMutations = `
  addGame(type: String, homePlayer: String, awayPlayer: String, score: String, home: StatsToSend, away: StatsToSend): Response
  acceptGameScore(_id: String): Response
,`;

const GameResolvers = {
  Query: {
    games: (root, args) => {
      return Game.find({ type: args._id });
    }
  },
  Mutation: {
    addGame: (root, args) => {
      const {
        type, homePlayer, awayPlayer, score, home, away
      } = args;
      return new Promise((resolve) => {
        Game.create(
          {
            type,
            homePlayer,
            awayPlayer,
            score,
            home,
            away
          },
          (error) => {
            if (error) {
              resolve({
                error: true,
                message: msg.basic
              });
            }
            resolve({
              error: false,
              message: msg.gameAdded
            });
          }
        );
      });
    },
    acceptGameScore: (root, args) => {
      return new Promise((resolve) => {
        Game.findByIdAndUpdate(
          args._id,
          {
            accepted: true
          },
          (error) => {
            if (error) {
              resolve({
                error: true,
                message: msg.basic
              });
            }
            resolve({
              error: false,
              message: msg.gameAccepted
            });
          }
        );
      });
    }
  }
};

module.exports = {
  GameQueries,
  GameTypes,
  GameMutations,
  GameResolvers
};
