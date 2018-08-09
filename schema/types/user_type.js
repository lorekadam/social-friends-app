const { User, Friend } = require('../../models/User');
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
  removeFriend(myId: String, friendId: String): Response
  acceptFriendRequest(friendId: String, requestId: String): Response
  readNotification(myId: String, notificationId: String): Response
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
      return new Promise((resolve) => {
        User.findById(args.myId, (error, user) => {
          if (error) {
            resolve({
              error: true,
              message: msg.auth.noUser
            });
          }
          const { friends } = user;
          let exists = false;
          for (let i = 0; i < friends.length; i += 1) {
            if (friends[i].friendId.toString() === args.friendId) {
              exists = true;
              resolve({
                error: true,
                message: msg.friendExists
              });
            }
          }
          if (!exists) {
            User.findByIdAndUpdate(
              args.myId,
              {
                $push: {
                  friends: {
                    friendId: args.friendId,
                    friendName: args.friendName,
                    accepted: args.accepted
                  }
                }
              },
              { upsert: true, new: true },
              (error, user) => {
                if (error) {
                  resolve({
                    error: true,
                    message: msg.basic
                  });
                }
                // Friend successfully added, add notification
                User.findByIdAndUpdate(
                  args.friendId,
                  {
                    $push: {
                      notifications: {
                        requestId: user.friends[user.friends.length - 1]._id,
                        fromId: user._id,
                        message: `${msg.friendRequest} ${user.username}`,
                        type: types.FRIEND_REQUEST
                      }
                    }
                  },
                  (error) => {
                    if (error) {
                      resolve({
                        error: true,
                        message: msg.basic
                      });
                    }
                    resolve({
                      error: false,
                      message: 'Request send',
                      data: user.friends[user.friends.length - 1]._id
                    });
                  }
                );
              }
            );
          }
        });
      });
    },
    removeFriend: (root, args) => {
      return new Promise((resolve) => {
        User.findByIdAndUpdate(
          args.myId,
          { $pull: { friends: { friendId: args.friendId } } },
          (error) => {
            if (error) {
              resolve({
                error: true,
                message: msg.basic
              });
            }
            resolve({
              error: false,
              message: msg.friendRequestAccepted
            });
          }
        );
      });
    },
    acceptFriendRequest: (root, args) => {
      return new Promise((resolve) => {
        User.findById(args.friendId, (error, user) => {
          const request = user.friends.id(args.requestId);
          request.accepted = true;
          user.save((error) => {
            if (error) {
              resolve({
                error: true,
                message: msg.basic
              });
            }
            User.findByIdAndUpdate(
              request.friendId,
              {
                $push: {
                  friends: {
                    friendId: args.friendId,
                    friendName: user.username,
                    accepted: true
                  }
                }
              },
              (error) => {
                if (error) {
                  resolve({
                    error: true,
                    message: msg.basic
                  });
                }
                resolve({
                  error: false,
                  message: msg.friendRequestAccepted
                });
              }
            );
          });
        });
      });
    },
    readNotification: (root, args) => {
      return new Promise((resolve) => {
        User.findById(args.myId, (error, user) => {
          const notification = user.notifications.id(args.notificationId);
          notification.read = true;
          user.save((error) => {
            if (error) {
              resolve({
                error: true,
                message: msg.basic
              });
            }
            resolve({
              error: false,
              message: msg.notificationRead
            });
          });
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
