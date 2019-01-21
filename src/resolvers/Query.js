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
  async friendships(parent, args, ctx, info) {
    const userId = ctx.request.userId;
    if (!userId) {
      return null;
    }
    const friendships = await ctx.db.query.friendships(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
    return friendships;
  }
};

module.exports = Query;
