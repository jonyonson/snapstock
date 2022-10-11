import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { IEX_CLOUD } from '../../utils/constants';
import { createRouter } from './context';

const { BASE_URL, TOKEN } = IEX_CLOUD;

export const quotesRouter = createRouter()
  .query('chart', {
    input: z.object({ symbol: z.string(), range: z.string() }),
    async resolve({ input }) {
      const { symbol, range } = input;
      const url = `${BASE_URL}/stock/${symbol}/chart/${range}?token=${TOKEN}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
      } catch (err) {
        let message = 'Something went wrong';
        if (err instanceof Error) {
          message = err.message;
        }

        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message });
      }
    },
  })
  .query('data', {
    input: z.object({ symbol: z.string() }),
    async resolve({ input }) {
      const { symbol } = input;
      const url = `${BASE_URL}/stock/${symbol}/batch?types=quote,company,intraday-prices,stats&token=${TOKEN}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (err) {
        let message = 'Something went wrong';
        if (err instanceof Error) {
          message = err.message;
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message });
      }
    },
  });
