const mongoose = require('mongoose');
const { User, Notification } = require('../../models/User');
const { Duel } = require('../../models/Duel');
const msg = require('../../helpers/messages');
const types = require('../../helpers/types');

const addNotification = (toId, fromId, requestId, message, type) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      toId,
      {
        $push: {
          notifications: {
            fromId,
            requestId,
            message,
            type
          }
        }
      },
      (error) => {
        if (error) {
          reject({
            error: true,
            message: msg.basic
          });
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
  readNotification(_id: String): Response
  addDuel(_id: String, friendId: String, name: String): Response
  acceptNotification(_id: String): Response
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
                addNotification(
                  args.friendId,
                  user._id,
                  user.friends[user.friends.length - 1]._id,
                  `${msg.friendRequest} ${user.username}`,
                  types.FRIEND_REQUEST
                ).then(() => {
                  resolve({
                    error: false,
                    message: msg.notificationAdded,
                    data: user.friends[user.friends.length - 1]._id
                  });
                });
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
              message: msg.requestAccepted
            });
          }
        );
      });
    },
    readNotification: (root, args) => {
      return new Promise((resolve) => {
        User.findOne({ 'notifications._id': args._id }, (error, user) => {
          const notification = user.notifications.id(args._id);
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
                      _id: args._id
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
                      addNotification(
                        args.friendId,
                        args._id,
                        duel._id,
                        `${msg.duelRequest}`,
                        types.DUEL_REQUEST
                      ).then(() => {
                        resolve({
                          error: false,
                          message: msg.duelAdded
                        });
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
    },
    acceptNotification: (root, args) => {
      return new Promise((resolve) => {
        User.findOne({ 'notifications._id': args._id }, (error, user) => {
          const notification = user.notifications.id(args._id);
          const type = notification.type;
          if (type === types.FRIEND_REQUEST) {
            User.findById(notification.fromId, (error, friend) => {
              const request = friend.friends.id(notification.requestId);
              request.accepted = true;
              friend.save((error) => {
                if (error) {
                  resolve({
                    error: true,
                    message: msg.basic
                  });
                }
                user.update(
                  {
                    $push: {
                      friends: {
                        friendId: notification.fromId,
                        friendName: friend.username,
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
                    notification.read = true;
                    user.save();
                    resolve({
                      error: false,
                      message: msg.requestAccepted
                    });
                  }
                );
              });
            });
          }
          if (type === types.DUEL_REQUEST) {
            Duel.findOneAndUpdate(notification.requestId, { accepted: true }, (error) => {
              if (error) {
                resolve({
                  error: true,
                  message: msg.basic
                });
              }
              user.update(
                {
                  $push: {
                    duels: {
                      _id: notification.requestId
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
                  notification.read = true;
                  user.save();
                  resolve({
                    error: false,
                    message: msg.requestAccepted
                  });
                }
              );
            });
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
  UserResolvers,
  addNotification
};
