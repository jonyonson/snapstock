import { NextApiRequest, NextApiResponse } from 'next';
import { IEX_CLOUD } from '../../../utils/constants';

const { BASE_URL, TOKEN } = IEX_CLOUD;

async function searchHandler(req: NextApiRequest, res: NextApiResponse) {
  const { value } = req.query;
  const url = `${BASE_URL}/search/${value}?token=${TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
}

export default searchHandler;
