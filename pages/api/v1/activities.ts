import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

async function getActivities(req: NextApiRequest) {
  const data = await prisma?.activity.findMany({
    where: {
      workoutId: req.query.id as string,
    },
    orderBy: {
      display_seq: 'asc',
    },
  });
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const data = await getActivities(req);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Failed to load activities.',
    });
  }
}
