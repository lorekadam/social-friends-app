import User from '../../models/User';

export const UserQueries = `
  user(_id:String): BasicUserData
`;

export const UserTypes = `
  type BasicUserData {
    _id: String,
    username: String,
    email: String
  }
`;

export const UserMutations = `
  addUser(username: String, email: String): BasicUserData
`;

export const UserResolvers = {
  Query: {
    user: (root, args) => {
      return User.findOne(args);
    }
  }
};
