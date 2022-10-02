import { createRouter } from './context';
import { z } from 'zod';
import { IEX_CLOUD } from '../../utils/constants';
import { TRPCError } from '@trpc/server';
import { Suggestion } from '../../types';

const { BASE_URL, TOKEN } = IEX_CLOUD;

export const searchRouter = createRouter().query('suggestions', {
  input: z.object({ term: z.string() }).nullish(),
  async resolve({ input }) {
    const searchTerm = input?.term;
    const url = `${BASE_URL}/search/${searchTerm}?token=${TOKEN}`;

    try {
      const response = await fetch(url);
      const suggestions: Suggestion[] = await response.json();

      return suggestions;
    } catch (err) {
      let message = 'Something went wrong';
      if (err instanceof Error) {
        message = err.message;
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: message,
      });
    }
  },
});
