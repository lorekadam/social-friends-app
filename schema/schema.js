const { makeExecutableSchema, gql } = require('apollo-server');
const User = require('../models/User');

const Game = require('../models/Game');

console.log(makeExecutableSchema);
const typeDefs = gql`
  type Query {
    user(_id:String): BasicUserData
  }
  type BasicUserData {
    _id: String,
    username: String,
    email: String
  }
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
  type Mutation {
    addUser(username: String, email: String): BasicUserData
    addGame(homePlayer: String, awayPlayer: String): Game
  }
`;

const Query = `
type Query {
  user(_id:String): BasicUserData
}`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return User.findOne(args);
    }
  },
  Mutation: {
    addGame: (root, args, context, info) => {
      let newGame = new Game({
        homePlayer: args.homePlayer,
        awayPlayer: args.awayPlayer
      });
      return newGame.save();
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = {
  typeDefs,
  resolvers
};
