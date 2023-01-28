import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const data = req.body.activities;

  if (req.method === 'POST') {
    try {
      await prisma.$transaction(
        [
          prisma.activity.deleteMany({
            where: {
              workout: {
                id: id,
              },
            },
          }),
          prisma.activity.createMany({
            data: data,
          }),
        ],
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );

      res.status(200).json({ status: 'success', message: 'Updated activities' });
    } catch (error) {
      res.status(400).json({ status: 'failed', message: 'Something went wrong updating workout.' });
    }
  }
}
