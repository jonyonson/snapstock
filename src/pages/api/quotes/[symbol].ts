import type { NextApiRequest, NextApiResponse } from 'next';
import { IEX_CLOUD } from '../../../utils/constants';

const { BASE_URL, TOKEN } = IEX_CLOUD;

export async function fetchQuote(symbol: string) {
  const url = `${BASE_URL}/stock/${symbol}/batch?types=quote,company,stats&token=${TOKEN}`;

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.statusText);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    res.status(404).json({ message: 'Please provide a symbol.' });
    return;
  }

  try {
    const data = await fetchQuote(symbol);
    res.status(200).json(data);
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({ message });
  }
}
