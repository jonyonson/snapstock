// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { searchRouter } from './search';
import { watchlistRouter } from './watchlist';
import { quotesRouter } from './quotes';
import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('search.', searchRouter)
  .merge('watchlist.', watchlistRouter)
  .merge('quotes.', quotesRouter)
  .merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
