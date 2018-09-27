const mongoose = require('mongoose');
const { User, Notification } = require('../../models/OLD/User');
const { Duel } = require('../../models/OLD/Duel');
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
      (error, user) => {
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
    duels: [Duels],
    notifications: [Notifications]
  }
  type Notifications {,
    _id: String,
    message: String,
    requestId: String,
    fromId: String,
    type: String
  }
  type Duels {
    _id: String,
    name: String
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
  addFriend(_id: String, friendName: String): Response
  removeFriend(_id: String, friendId: String): Response
  readNotification(_id: String): Response
  addDuel(_id: String, friendId: String, duelName: String): Response
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
        // find if friend exists
        User.findOne({ username: args.friendName }, (error, friendToInvite) => {
          if (error) {
            resolve({
              error: true,
              message: msg.basic
            });
          }
          if (friendToInvite === null) {
            resolve({
              error: true,
              message: msg.auth.noUser
            });
          } else {
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
                if (friends[i].friendId.toString() === friendToInvite._id.toString()) {
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
                        friendId: friendToInvite._id,
                        friendName: args.friendName
                      }
                    }
                  },
                  { upsert: true, new: true },
                  (error, newUser) => {
                    if (error) {
                      resolve({
                        error: true,
                        message: msg.basic
                      });
                    }
                    // Friend successfully added, add notification
                    addNotification(
                      friendToInvite._id,
                      newUser._id,
                      newUser.friends[newUser.friends.length - 1]._id,
                      `${msg.friendRequest} ${newUser.username}`,
                      types.FRIEND_REQUEST
                    ).then(() => {
                      resolve({
                        error: false,
                        message: msg.requestSended,
                        response: newUser.friends[newUser.friends.length - 1]._id
                      });
                    });
                  }
                );
              }
            });
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
              $all: [args._id, args.friendId]
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
                  name: args.duelName,
                  players: [args._id, args.friendId]
                },
                (error, duel) => {
                  if (error) {
                    resolve({
                      error: true,
                      message: msg.basic
                    });
                  }
                  User.findByIdAndUpdate(
                    args._id,
                    {
                      $push: {
                        duels: {
                          _id: duel._id,
                          name: args.duelName
                        }
                      }
                    },
                    { multi: true, upsert: true, new: true },
                    (error, user) => {
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
                        `${msg.duelRequest}${user.username}`,
                        types.DUEL_REQUEST
                      ).then((error) => {
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
                    notification.remove();
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
            Duel.findOneAndUpdate(notification.requestId, { accepted: true }, (error, duel) => {
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
                      _id: notification.requestId,
                      name: duel.name
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
                  notification.remove();
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
