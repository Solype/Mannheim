import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { name = '' } = req.query;

    console.log("request query: ", req.query);

    res.status(200).json({ message: `Query received: ${name}` });
}
