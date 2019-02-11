const { forwardTo } = require('prisma-binding');

const Query = {
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
  async notifications(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    return await ctx.db.query.notifications(
      {
        where: {
          user: { id: userId }
        },
        orderBy: 'createdAt_DESC'
      },
      info
    );
  }
};

module.exports = Query;
