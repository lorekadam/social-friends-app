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
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid password!`);
    }
    user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return user;
  },
  async requestReset(parent, args, ctx, info) {
    const user = ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });
    return { message: 'Check your mailbox' };
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
  async addFriend(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    // 1. Get Friend to invite
    const friendToAdd = await ctx.db.query.user({
      where: {
        name: args.name
      }
    });
    // 2. Check if they are already friends
    const alreadyFriends = await ctx.db.query.friends({
      where: {
        friendOne: {
          OR: [{ id: friendToAdd.id }, { id: userId }]
        },
        friendTwo: {
          OR: [{ id: friendToAdd.id }, { id: userId }]
        }
      }
    });
    // 3. Add friend
    if (alreadyFriends.length === 0) {
      const friendAdded = await ctx.db.mutation.createFriend({
        data: {
          friendOne: {
            connect: {
              id: userId
            }
          },
          friendTwo: {
            connect: {
              id: friendToAdd.id
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
          friend: {
            connect: {
              id: friendAdded.id
            }
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
  },
  async handleNotification(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    // 1. Get notification
    const notification = ctx.db.query.notification({
      where: {
        id: args.id
      }
    });
    // 2. Check type
    // 3. do proper action
    console.log(notification);
    return { message: 'notification' };
  }
};

module.exports = Mutation;
