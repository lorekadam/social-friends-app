const { makeExecutableSchema } = require('apollo-server');

const { GlobalTypes } = require('./types/global_type');
const {
  GameQueries, GameTypes, GameMutations, GameResolvers
} = require('./types/game_type');
const {
  UserQueries, UserTypes, UserMutations, UserResolvers
} = require('./types/user_type');

const Query = `
  type Query {
    ${UserQueries},
    ${GameQueries}
  }
`;

const Types = `
  ${GlobalTypes}
  ${UserTypes}
  ${GameTypes}
`;

const Mutations = `
  type Mutation {
    ${UserMutations},
    ${GameMutations}
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, Types, Mutations],
  resolvers: [UserResolvers, GameResolvers]
});

module.exports = schema;
