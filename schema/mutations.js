const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const GameType = require('./types/game_type');
const Game = require('../models/Game');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGame: {
      type: GameType,
      args: {
        homePlayer: {
          type: GraphQLString
        },
        awayPlayer: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        let newGame = new Game({
          homePlayer: args.homePlayer,
          awayPlayer: args.awayPlayer
        });
        return newGame.save();
      }
    }
  }
});

module.exports = mutation;
