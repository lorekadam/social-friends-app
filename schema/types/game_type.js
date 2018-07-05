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

