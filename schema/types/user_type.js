const mongoose = require('mongoose');
const { User } = require('../../models/User');
const { Duel } = require('../../models/Duel');
const msg = require('../../helpers/messages');
const types = require('../../helpers/types');

const addNotification = (fromId, toId, requestId, type, message) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      toId,
      {
        $push: {
          notifications: {
            requestId,
            fromId,
            message,
            type
          }
        }
      },
      (error) => {
        if (error) {
          reject();
        }
        resolve();
      }
    );
  });
};

const UserQueries = `
  user(_id:String,username:String): BasicUserData
  allUsers: [OnlyUsername]
`;
const UserTypes = `
  type BasicUserData {
    _id: String,
    username: String,
    email: String,
    friends: [Friend],
    duels: [Duels]
  }
  type Duels {
    _id: String
  }
  type OnlyUsername {
    _id: String,
    username: String
  }
  type Friend{
    _id: String,
    friendId: String,
    friendName: String,
    accepted: Boolean
  }
`;
const UserMutations = `
  addUser(username: String, email: String): BasicUserData
  addFriend(_id: String, friendId: String, friendName: String, accepted: Boolean): Response
  removeFriend(_id: String, friendId: String): Response
  acceptFriendRequest(friendId: String, requestId: String): Response
  readNotification(_id: String, notificationId: String): Response
  addDuel(_id: String, friendId: String, name: String): Response
`;

const UserResolvers = {
  Query: {
    user: (root, args) => {
      return User.findOne(args);
    },
    allUsers: () => {
      return User.find({});
    }
  },
  Mutation: {
    addFriend: (root, args) => {
      return new Promise((resolve) => {
        User.findById(args._id, (error, user) => {
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
              args._id,
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
                      message: msg.notificationAdded,
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
          args._id,
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
        User.findById(args._id, (error, user) => {
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
    },
    addDuel: (root, args) => {
      return new Promise((resolve) => {
        Duel.find(
          {
            players: {
              $in: [mongoose.Types.ObjectId(args._id), mongoose.Types.ObjectId(args.friendId)]
            }
          },
          (error, duels) => {
            if (error) {
              resolve({
                error: true,
                message: msg.auth.basic
              });
            }
            if (duels.length === 0) {
              Duel.create(
                {
                  name: args.name,
                  players: [args._id, args.friendId]
                },
                (error, duel) => {
                  if (error) {
                    resolve({
                      error: true,
                      message: msg.basic
                    });
                  }
                  User.update(
                    {
                      _id: {
                        $in: [
                          mongoose.Types.ObjectId(args._id),
                          mongoose.Types.ObjectId(args.friendId)
                        ]
                      }
                    },
                    {
                      $push: {
                        duels: {
                          _id: duel._id
                        }
                      }
                    },
                    { multi: true },
                    (error) => {
                      if (error) {
                        resolve({
                          error: true,
                          message: msg.basic
                        });
                      }
                      resolve({
                        error: false,
                        message: msg.duelAdded
                      });
                    }
                  );
                }
              );
            } else {
              resolve({
                error: true,
                message: msg.duelExists
              });
            }
          }
        );
      });
    }
  }
};

module.exports = {
  UserQueries,
  UserTypes,
  UserMutations,
  UserResolvers,
  addNotification
};
