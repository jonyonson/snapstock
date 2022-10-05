// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { searchRouter } from './search';
import { protectedExampleRouter } from './protected-example-router';
import { watchlistRouter } from './watchlist';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('search.', searchRouter)
  .merge('watchlist.', watchlistRouter)
  .merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
