import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    if (req.method === 'GET') {
      const data = await prisma?.workout.findMany({
        where: {
          userId: id as string,
        },
        orderBy: {
          display_seq: 'asc',
        },
      });
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error });
  }
}
