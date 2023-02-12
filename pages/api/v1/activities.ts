import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    getActivities(req, res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function getActivities(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma?.activity.findMany({
      where: {
        workoutId: req.query.id as string,
      },
      orderBy: {
        display_seq: 'asc',
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get activities' });
  }
}
