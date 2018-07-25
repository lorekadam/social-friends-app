const User = require('../../models/User');

const UserQueries = `
  user(_id:String): BasicUserData
`;
const UserTypes = `
  type BasicUserData {
    _id: String,
    username: String,
    email: String
  }
`;
const UserMutations = `
  addUser(username: String, email: String): BasicUserData
`;
const UserResolvers = {
  Query: {
    user: (root, args) => {
      return User.findOne(args);
    }
  }
};

module.exports = {
  UserQueries,
  UserTypes,
  UserMutations,
  UserResolvers
};
