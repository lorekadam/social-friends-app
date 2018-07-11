import { makeExecutableSchema } from 'apollo-server';

import { GameQueries, GameTypes, GameMutations, GameResolvers } from './types/game_type';
import { UserQueries, UserTypes, UserMutations, UserResolvers } from './types/user_type';

const Query = `
  type Query {
    ${UserQueries},
    ${GameQueries}
  }
`;

const Types = `
  ${UserTypes}
  ${GameTypes}
`;

const Mutations = `
  type Mutation {
    ${UserMutations},
    ${GameMutations}
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, Types, Mutations],
  resolvers: [UserResolvers, GameResolvers]
});
