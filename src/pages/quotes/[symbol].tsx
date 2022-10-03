import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { fetchQuote } from '../api/quotes/[symbol]';
import { Company, Quote, Stats } from '../../types';

interface QuotePageProps {
  quote: Quote;
  company: Company;
  stats: Stats;
}

export default function QuotePage({ quote, company, stats }: QuotePageProps) {
  const { symbol } = company;

  const follow = () => {
    console.log('todo: add follow mutation', symbol);
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
        <button className="btn btn-xs btn-outline" onClick={follow}>
          Follow
        </button>
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
