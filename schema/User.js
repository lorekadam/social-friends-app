const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;
const User = require('../models/User');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

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

module.exports = new GraphQLSchema({
  query: RootQuery
});
