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
      let response;
      User.findById(args.myId, (err, user) => {
        if (err) {
          response = {
            success: false,
            error: 'User not found',
            data: ''
          };
        }
        const { friends } = user;
        let exists = false;
        for (let i = 0; i < friends.length; i + 1) {
          if (friends[i]._id === args.friendId) {
            exists = true;
            response = {
              success: false,
              error: 'Friend already added',
              data: ''
            };
            break;
          }
        }
        if (!exists) {
          // TODO
          // user.update(
          //   {
          //     $push: { friends: { _id: args.friendId, username: args.friendUsername } }
          //   },
          //   {
          //     new: true
          //   },
          //   (err, user) => {
          //     console.log(err);
          //     console.log(user);
          //   }
          // );
        }
      });
      return response;
      // return {
      //   success: false,
      //   error: 'User not found',
      //   data: ''
      // };
      // return User.findByIdAndUpdate(
      //   args.myId,
      //   {
      //     $push: { friends: { _id: args.friendId, username: args.friendUsername } }
      //   },
      //   {
      //     new: true
      //   },
      //   (err, user) => {
      //     console.log(err);
      //     console.log(user);
      //   }
      // );
    }
  }
};

module.exports = {
  UserQueries,
  UserTypes,
  UserMutations,
  UserResolvers
};
