import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { fetchQuote } from '../api/quotes/[symbol]';
import { Company, FixMeLater, Quote, Stats } from '../../types';
import { trpc } from '../../utils/trpc';
import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';

// Constants
import { AUTH_STATUS } from '../../utils/constants';

// Icons
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

interface QuotePageProps {
  quote: Quote;
  company: Company;
  stats: Stats;
}

// interface WatchlistStock {
//   companyName: string;
//   symbol: string;
// }

export default function QuotePage({ quote, company, stats }: QuotePageProps) {
  const { status } = useSession();
  const { symbol, companyName } = company;

  const { data } = trpc.useQuery(['quotes.data', { symbol }]);

  const { data: watchlistData, isLoading } = trpc.useQuery(
    ['watchlist.get-all'],
    { enabled: status !== AUTH_STATUS.UNAUTHENTICATED },
  );
  console.log({ data });
  // const { data: chartData, isLoading: chartLoading } = trpc.useQuery([
  //   'quotes.chart',
  //   { symbol, range: '5y' },
  // ]);

  const qc = useQueryClient();

  const {
    mutate: addToWatchlist,
    // isLoading: addLoading,
    // isSuccess: addLoaded,
  } = trpc.useMutation(['watchlist.add'], {
    // onMutate: async (watchlisted: WatchlistStock) => {
    //   await qc.cancelQueries(['watchlist.get-all']);
    //   const previousList = qc.getQueryData(['watchlist.get-all']);
    //   qc.setQueryData(['watchlist.get-all'], (old: any) => [
    //     ...old,
    //     watchlisted,
    //   ]);

    //   return { previousList };
    // },

    onError: (err, newStock, context: FixMeLater) => {
      qc.setQueryData(['watchlist.get-all'], context.previousList);
    },

    onSettled: () => qc.invalidateQueries(['watchlist.get-all']),
  });

  const {
    mutate: removeFromWatchlist,
    // isLoading: removeLoading,
    // isSuccess: removeLoaded,
  } = trpc.useMutation(['watchlist.remove'], {
    // onMutate: async (removedStock: { symbol: string }) => {
    //   await qc.cancelQueries(['watchlist.get-all']);
    //   const previousWatchlist = qc.getQueryData(['watchlist.get-all']);
    //   qc.setQueryData(['watchlist.get-all'], (old: any) => {
    //     console.log({ old });
    //     return old.filter(
    //       (stock: any) => removedStock.symbol !== stock.symbol,
    //     );
    //   });

    //   return { previousWatchlist };
    // },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, removedStock, context: FixMeLater) => {
      qc.setQueryData(['watchlist.get-all'], context.previousWatchlist);
    },
    // Always refetch after error or success:
    onSettled: () => {
      qc.invalidateQueries(['watchlist.get-all']);
    },
  });

  const watchlist = watchlistData?.map((stock) => stock.symbol);
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
          <button
            className="btn btn-sm btn-outline gap-2"
            onClick={handleClick}
          >
            {watchlistIncludesCurrent ? (
              <>
                <MdFavorite size={20} />
                Unfollow
              </>
            ) : (
              <>
                <MdFavoriteBorder size={20} />
                Follow
              </>
            )}
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
