const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;
const User = require('../models/User');
const Game = require('../models/Game');

const UserType = require('./types/user_type');
const GameType = require('./types/game_type');

const mutation = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        _id: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return User.findOne(args);
      }
    },
    game: {
      type: GameType,
      args: {
        _id: {
          type: GraphQLString
        },
        homePlayer: {
          type: GraphQLString
        },
        awayPlayer: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        console.log(Game.findOne(args));
        return Game.findOne(args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
