import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { fetchQuote } from '../api/quotes/[symbol]';
import { Company, Quote, Stats } from '../../types';
import { trpc } from '../../utils/trpc';
import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';

interface QuotePageProps {
  quote: Quote;
  company: Company;
  stats: Stats;
}

interface WatchlistStock {
  companyName: string;
  symbol: string;
}

export default function QuotePage({ quote, company, stats }: QuotePageProps) {
  const { status } = useSession();
  const { symbol, companyName } = company;

  const enabled = status !== 'unauthenticated';
  const { data, isLoading } = trpc.useQuery(['watchlist.get-all'], { enabled });

  const queryClient = useQueryClient();

  const { mutate: addToWatchlist } = trpc.useMutation(['watchlist.add'], {
    onMutate: async (watchlisted: WatchlistStock) => {
      await queryClient.cancelQueries(['watchlist.get-all']);
      const previousList = queryClient.getQueryData(['watchlist.get-all']);
      queryClient.setQueryData(['watchlist.get-all'], (old: any) => [
        ...old,
        watchlisted,
      ]);

      return { previousList };
    },

    onError: (err, newStock, context: any) => {
      console.log({ context });
      queryClient.setQueryData(['watchlist.get-all'], context.previousList);
    },

    onSettled: () => queryClient.invalidateQueries(['watchlist.get-all']),
  });

  const { mutate: removeFromWatchlist } = trpc.useMutation(
    ['watchlist.remove'],
    {
      onMutate: async (removedStock: { symbol: string }) => {
        await queryClient.cancelQueries(['watchlist.get-all']);
        const previousWatchlist = queryClient.getQueryData([
          'watchlist.get-all',
        ]);
        queryClient.setQueryData(['watchlist.get-all'], (old: any) => {
          console.log({ old });
          return old.filter(
            (stock: any) => removedStock.symbol !== stock.symbol,
          );
        });

        return { previousWatchlist };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, removedStock, context: any) => {
        queryClient.setQueryData(
          ['watchlist.get-all'],
          context.previousWatchlist,
        );
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(['watchlist.get-all']);
      },
    },
  );

  const watchlist = data?.map((stock) => stock.symbol);
  const watchlistIncludesCurrent = watchlist?.includes(symbol);

  const handleClick = () => {
    if (watchlistIncludesCurrent) {
      removeFromWatchlist({ symbol });
    } else {
      addToWatchlist({ symbol, companyName });
    }
  };

  return (
    <>
      <Head>
        <title>
          {symbol} | ${quote.latestPrice} - Snapstock
        </title>
      </Head>

      <div className="flex items-center">
        <h1 className="mr-2 text-3xl">{symbol}</h1>
        {isLoading ? null : (
          <button className="btn btn-xs btn-outline" onClick={handleClick}>
            {watchlistIncludesCurrent ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
      <h1>{stats.companyName}</h1>
      <h2>{quote.latestPrice}</h2>
      <p>{company.description}</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const data = await fetchQuote(params?.symbol as string);
  const { quote, company, stats } = data;

  return { props: { quote, company, stats } };
};
