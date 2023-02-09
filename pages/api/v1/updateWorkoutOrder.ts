import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, Workout } from '@prisma/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    updateWorkoutOrder(req, res);
  } else {
    res.setHeader('Allow', 'PATCH');
    res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function updateWorkoutOrder(req: NextApiRequest, res: NextApiResponse) {
  const workouts = req.body;
  try {
    await prisma.$transaction(
      await workouts.map((workout: Workout) => {
        return prisma.workout.update({
          where: {
            id: workout.id,
          },
          data: {
            display_seq: workout.display_seq,
          },
        });
      }),
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
    res.status(200).json({ status: 'success', message: 'Updated workout order' });
  } catch (error) {
    console.log('REQUEST ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Error updating workout order' });
  }
}
