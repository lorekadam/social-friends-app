// const graphql = require('graphql');
// const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// const PlayerStatsType = new GraphQLObjectType({
//   name: 'GameStats',
//   fields: {
//     team: {
//       type: GraphQLString
//     },
//     score: {
//       type: GraphQLInt
//     },
//     shots: {
//       type: GraphQLInt
//     },
//     shotsOnTarget: {
//       type: GraphQLInt
//     },
//     possession: {
//       type: GraphQLInt
//     },
//     tackles: {
//       type: GraphQLInt
//     },
//     fouls: {
//       type: GraphQLInt
//     },
//     yellow: {
//       type: GraphQLInt
//     },
//     red: {
//       type: GraphQLInt
//     },
//     injuries: {
//       type: GraphQLInt
//     },
//     offsides: {
//       type: GraphQLInt
//     },
//     corners: {
//       type: GraphQLInt
//     },
//     shotsAccuracy: {
//       type: GraphQLInt
//     },
//     passAccuracy: {
//       type: GraphQLInt
//     }
//   }
// });

// const GameType = new GraphQLObjectType({
//   name: 'Game',
//   fields: {
//     _id: { type: GraphQLString },
//     homePlayer: {
//       type: GraphQLString
//     },
//     home: {
//       type: PlayerStatsType
//     },
//     awayPlayer: {
//       type: GraphQLString
//     },
//     away: {
//       type: PlayerStatsType
//     },
//     score: {
//       type: GraphQLString
//     }
//   }
// });

// module.exports = GameType;

export const PlayerStats = `
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
`;

export const Game = `
  type Game {
    _id: String,
    homePlayer: String,
    home: PlayerStats,
    awayPlayer: String,
    away: PlayerStats,
    score: String
  }
`;
