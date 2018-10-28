const { forwardTo } = require('prisma-binding');

const Query = {
  //   async sports(parent, args, ctx, info) {
  //     const sports = await ctx.db.query.sports();
  //     return sports;
  //   }
  sports: forwardTo('db')
};

module.exports = Query;
