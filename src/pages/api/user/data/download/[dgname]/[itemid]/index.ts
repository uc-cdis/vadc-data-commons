import { NextApiRequest, NextApiResponse } from 'next';

const data = 'http://localhost:3000/images/logo.svg?width=640&q=75';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  return res.status(200).json({url: data});

};
export default handler;
