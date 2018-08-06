const User = require('../../models/User');

const UserQueries = `
  user(_id:String,username:String): BasicUserData
  users: [OnlyUsername]
`;
const UserTypes = `
  type BasicUserData {
    _id: String,
    username: String,
    email: String,
    friends: [Friend]
  }
  type OnlyUsername {
    _id: String,
    username:String
  }
  type Friend{
    _id: String,
    username: String,
    accepted: Boolean
  }
`;
const UserMutations = `
  addUser(username: String, email: String): BasicUserData
  addFriend(myId: String, friendId: String, friendUsername: String): Response
`;

const UserResolvers = {
  Query: {
    user: (root, args) => {
      return User.findOne(args);
    },
    users: () => {
      return User.find({});
    }
  },
  Mutation: {
    addFriend: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findById(args.myId, (err, user) => {
          if (err) {
            resolve({
              success: false,
              error: 'User not found',
              data: ''
            });
          }
          const { friends } = user;
          let exists = false;
          for (let i = 0; i < friends.length; i += 1) {
            if (friends[i]._id.toString() === args.friendId) {
              exists = true;
              resolve({
                success: false,
                error: 'Friend already added',
                data: ''
              });
            }
          }
          if (!exists) {
            user.update(
              {
                $push: { friends: { _id: args.friendId, username: args.friendUsername } }
              },
              (error, friend) => {
                if (error) {
                  resolve({
                    success: false,
                    error: 'Something went wrong',
                    data: ''
                  });
                }
                resolve({
                  success: true,
                  error: '',
                  data: friend
                });
              }
            );
          }
        });
      });
    }
  }
};

module.exports = {
  UserQueries,
  UserTypes,
  UserMutations,
  UserResolvers
};
