const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mutation = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );

    user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return user;
  },
  async signinFacebook(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // Check if there is a user with same email
    let isUser = await ctx.db.query.user({
      where: {
        email: args.email
      }
    });

    // if not create new one
    if (isUser === null) {
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            permissions: { set: ['USER'] }
          }
        },
        info
      );
      // send JWT
      user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      return user;
    } else {
      // if is add facebookId
      if (isUser.facebookId === null) {
        isUser = await ctx.db.mutation.updateUser({
          where: { email: args.email },
          data: {
            facebookId: args.facebookId
          }
        });
      }
      // send JWT
      isUser.jwt = jwt.sign({ userId: isUser.id }, process.env.APP_SECRET);
      return isUser;
    }
  },
  async updateUserName(parent, { name }, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }

    const user = await ctx.db.query.user({
      where: {
        name
      }
    });

    if (user === null) {
      const updateUser = await ctx.db.mutation.updateUser({
        where: {
          id: userId
        },
        data: {
          name
        }
      });
      if (updateUser.name === name) {
        return { message: 'Success!' };
      } else {
        return { message: 'Something went wrong' };
      }
    } else {
      return { message: 'Given username is already taken' };
    }
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    if (user.password === null && user.facebookId !== null) {
      return user;
    } else {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error(`Invalid password!`);
      }
      user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      return user;
    }
  },
  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    } else {
      if (user.password === null) {
        throw new Error(`Reset password can't be done`);
      } else {
        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await ctx.db.mutation.updateUser({
          where: { email: args.email },
          data: {
            resetToken,
            resetTokenExpiry
          }
        });
        return { message: 'Check your mailbox' };
      }
    }
  },
  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error(`Your passwords don\'t match! `);
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now - 3600000
      }
    });
    if (!user) {
      throw new Error(`This token is either invalid or expired`);
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    updatedUser.jwt = jwt.sign(
      { userId: updatedUser.id },
      process.env.APP_SECRET
    );
    return updatedUser;
  },
  async inviteFriend(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    // 1. Get Friend to invite
    const friendToAdd = await ctx.db.query.user({
      where: {
        name: args.name,
        id: args.id
      }
    });
    if (friendToAdd) {
      // 2. Check if they are already friends
      const alreadyFriends = await ctx.db.query.friendships({
        where: {
          user: {
            id: userId
          },
          friend: {
            id: friendToAdd.id
          }
        }
      });
      // 3. Add friend
      if (alreadyFriends.length === 0) {
        const userFriendship = await ctx.db.mutation.createFriendship({
          data: {
            user: {
              connect: {
                id: userId
              }
            },
            friend: {
              connect: {
                id: friendToAdd.id
              }
            }
          }
        });

        const friendFriendship = await ctx.db.mutation.createFriendship({
          data: {
            user: {
              connect: {
                id: friendToAdd.id
              }
            },
            friend: {
              connect: {
                id: userId
              }
            }
          }
        });

        // 4. Add Notification for friend to add
        await ctx.db.mutation.createNotification({
          data: {
            type: 'FRIEND_INVITE',
            user: {
              connect: {
                id: friendToAdd.id
              }
            },
            friendship: {
              connect: [{ id: userFriendship.id }, { id: friendFriendship.id }]
            }
          }
        });
        return { message: 'Friend invitation has been sended' };
      } else {
        if (alreadyFriends[0].accepted) {
          return { message: 'You are already friends!' };
        } else {
          return { message: 'Waitting for accept' };
        }
      }
    } else {
      return { message: 'There is no user with this name :(' };
    }
  },
  async removeFriend(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    // 1. Find friends
    const friendships = await ctx.db.query.friendships({
      where: {
        OR: [
          {
            user: {
              id: userId
            },
            friend: {
              id: args.friendId
            }
          },
          {
            user: {
              id: args.friendId
            },
            friend: {
              id: userId
            }
          }
        ]
      }
    });
    // Remove notification for this friendship
    await ctx.db.mutation.deleteManyNotifications({
      where: {
        friendship_every: {
          OR: [{ id: friendships[0].id }, { id: friendships[1].id }]
        }
      }
    });
    const deleted = await ctx.db.mutation.deleteManyFriendships({
      where: {
        OR: friendships
      }
    });
    if (deleted.count === 2) {
      return { message: 'Success!' };
    } else {
      return { message: 'Something went wrong :(' };
    }
  },
  async acceptFriendInvite(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    // 1. Get notification
    const notification = await ctx.db.mutation.updateNotification(
      {
        data: {
          viewed: true,
          accepted: true
        },
        where: {
          id: args.id
        }
      },
      `{
        id,
        type,
        friendship{
          id
        }
      }
      `
    );

    // 2. Check type
    if (notification.type === 'FRIEND_INVITE') {
      const acceptInvitation = await ctx.db.mutation.updateManyFriendships({
        data: {
          accepted: true
        },
        where: {
          OR: notification.friendship
        }
      });
      if (acceptInvitation.count === 2) {
        return { message: 'Success!' };
      } else {
        return { message: 'Something went wrong :(' };
      }
    } else {
      return null;
    }
  }
};

module.exports = Mutation;
