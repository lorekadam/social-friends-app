const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;
const User = require('../models/user');

const UserType = require('./user');

const GameMutations = require('./game');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        const value =
          args.email !== undefined ? { email: args.email } : { username: args.username };
        return User.findOne(value);
      }
    }
  }
});

console.log(GameMutations);

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGame: {
      GameMutations
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
