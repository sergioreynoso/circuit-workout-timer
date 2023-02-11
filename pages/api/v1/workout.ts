import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      getWorkout(req, res);
      break;
    case 'POST':
      postWorkout(req, res);
      break;
    case 'PATCH':
      updateWorkout(req, res);
      break;
    case 'DELETE':
      deleteWorkout(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function getWorkout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.workout.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        activities: {
          orderBy: {
            display_seq: 'asc',
          },
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get workout' });
  }
}

async function postWorkout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.workout.create({
      data: {
        name: req.body.name,
        set_count: req.body.set_count,
        set_rest: req.body.set_rest,
        duration: req.body.duration,
        userId: req.body.userId,
        display_seq: req.body.display_seq,
        activities: {
          create: req.body.activities,
        },
      },
      include: {
        activities: true,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to post workout' });
  }
}

async function updateWorkout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.workout.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        set_count: req.body.set_count,
        set_rest: req.body.set_rest,
        duration: req.body.duration,
      },
      include: {
        activities: true,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to patch workout' });
  }
}

async function deleteWorkout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.workout.delete({
      where: {
        id: req.body.id as string,
      },
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete activities' });
  }
}
