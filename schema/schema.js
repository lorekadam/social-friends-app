const { gql } = require('apollo-server');
const User = require('../models/User');

const typeDefs = gql`
  type Query {
    user(_id:String): BasicUserData
  }
  type BasicUserData {
    _id: String,
    username: String,
    email: String
  }
  type Mutation {
    addUser(username: String, email: String): BasicUserData
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return User.findOne(args);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
