import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    getWorkouts(req, res);
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function getWorkouts(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const data = await prisma?.workout.findMany({
      where: {
        userId: id as string,
      },
      orderBy: {
        display_seq: 'asc',
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get workouts' });
  }
}
