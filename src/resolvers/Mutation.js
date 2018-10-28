const Mutation = {
  async createSport(parent, args, ctx, info) {
    const sport = await ctx.db.mutation.createSport(
      {
        data: {
          ...args
        }
      },
      info
    );
    return sport;
  }
};

module.exports = Mutation;
