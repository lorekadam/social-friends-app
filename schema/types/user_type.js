const User = require('../../models/User');
const msg = require('../../helpers/messages');
const types = require('../../helpers/types');

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
  addFriend(myId: String, friendId: String, friendName: String, accepted: Boolean): Response
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
        User.findById(args.myId, (error, user) => {
          if (error) {
            resolve({
              error: true,
              message: msg.auth.noUser,
              data: ''
            });
          }
          const { friends } = user;
          let exists = false;
          for (let i = 0; i < friends.length; i += 1) {
            if (friends[i].friendId.toString() === args.friendId) {
              exists = true;
              resolve({
                error: true,
                message: msg.friendExists,
                data: ''
              });
            }
          }
          if (!exists) {
            user.update(
              {
                $push: {
                  friends: {
                    friendId: args.friendId,
                    friendName: args.friendName,
                    accepted: args.accepted
                  }
                }
              },
              { new: true },
              (error, friend) => {
                if (error) {
                  resolve({
                    error: true,
                    message: msg.basic,
                    data: ''
                  });
                }
                // Friend successfully added, add notification
                User.findByIdAndUpdate(
                  args.friendId,
                  {
                    $push: {
                      notifications: {
                        message: `${msg.friendRequest} ${user.username}`,
                        type: types.FRIEND_REQUEST
                      }
                    }
                  },
                  (error) => {
                    if (error) {
                      resolve({
                        error: true,
                        message: msg.basic,
                        data: ''
                      });
                    }
                    resolve({
                      error: false,
                      message: 'Request send',
                      data: JSON.stringify(friend)
                    });
                  }
                );
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
