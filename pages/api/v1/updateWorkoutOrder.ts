import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, data } = req.body;

  if (req.method === 'POST') {
    try {
      await prisma.$transaction(
        [
          prisma.workout.deleteMany({
            where: {
              user: {
                id: id,
              },
            },
          }),
          prisma.workout.createMany({
            data: data,
          }),
        ],
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
      res.status(200).json({ status: 'success', message: 'Updated activities' });
    } catch (error) {
      res.status(400).json({ status: 'failed', message: error });
    }
  }
}
