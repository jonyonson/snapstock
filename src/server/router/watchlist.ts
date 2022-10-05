import { createProtectedRouter } from './context';
import { z } from 'zod';
// import * as trpc from '@trpc/server';

export const watchlistRouter = createProtectedRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.watchlistStock.findMany({
        where: { userId: ctx.session?.user?.id },
      });
    },
  })
  .mutation('add', {
    input: z.object({
      symbol: z.string(),
      companyName: z.string(),
    }),
    async resolve({ ctx, input }) {
      const stock = await ctx.prisma.watchlistStock.create({
        data: {
          ...input,
          user: { connect: { id: ctx.session?.user?.id } },
        },
      });

      return stock;
    },
  })
  .mutation('remove', {
    input: z.object({ symbol: z.string() }),
    async resolve({ ctx, input }) {
      await ctx.prisma.watchlistStock.delete({
        where: { symbol: input.symbol },
      });
    },
  });
