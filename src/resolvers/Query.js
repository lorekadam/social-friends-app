const { forwardTo } = require('prisma-binding');

const Query = {
  async me(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async user(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.user(
      {
        where: { id: args.id }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.users({
      where: {
        ...args.where,
        id_not: userId
      },
      info
    });
  },
  async friendsToInvite(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    const userFriends = await ctx.db.query.friendships(
      {
        where: {
          user: { id: userId }
        }
      },
      `{ 
        friend{
          id
        } 
      }`
    );
    const id = [];
    userFriends.forEach((item) => {
      id.push({ id: item.friend.id });
    });
    const users = await ctx.db.query.users({
      where: {
        ...args.where,
        NOT: [{ id: userId }, ...id]
      },
      info
    });
    return users;
  },
  async friendships(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.friendships(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  },
  async friendshipsConnection(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.friendshipsConnection(
      {
        where: {
          ...args.where,
          user: { id: userId }
        }
      },
      info
    );
  },
  async notifications(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    const notifications = await ctx.db.query.notifications(
      {
        where: {
          user: { id: userId },
          done: false
        },
        orderBy: 'createdAt_DESC'
      },
      info
    );
    return notifications;
  },
  async unviewedNotifications(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    const notifications = await ctx.db.query.notifications(
      {
        where: {
          user: { id: userId },
          viewed: false
        },
        orderBy: 'createdAt_DESC'
      },
      info
    );
    return { message: notifications ? notifications.length : '0' };
  }
};

module.exports = Query;
