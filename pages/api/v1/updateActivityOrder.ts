import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Activity, Prisma } from '@prisma/client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    updateWorkoutOrder(req, res);
  } else {
    res.setHeader('Allow', 'PATCH');
    res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function updateWorkoutOrder(req: NextApiRequest, res: NextApiResponse) {
  const activities = req.body;
  try {
    await prisma.$transaction(
      await activities.map((activity: Activity) => {
        return prisma.activity.update({
          where: {
            id: activity.id,
          },
          data: {
            display_seq: activity.display_seq,
          },
        });
      }),
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
    res.status(200).json({ status: 'success', message: 'Updated activities order' });
  } catch (error) {
    console.log('REQUEST ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Error updating activities order' });
  }
}
