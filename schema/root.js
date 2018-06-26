const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;
const User = require('../models/user');

const UserType = require('./types/user_type');

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
        const value =
          args.email !== undefined ? { email: args.email } : { username: args.username };
        return User.findOne(value);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
