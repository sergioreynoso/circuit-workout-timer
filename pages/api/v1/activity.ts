import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST':
      postActivity(req, res);
      break;
    case 'PATCH':
      updateActivity(req, res);
      break;
    case 'DELETE':
      deleteActivity(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST', 'PATCH', 'DELETE']);
      res.status(405).json({ status: 'error', message: `${req.method} method not allowed` });
  }
}

async function postActivity(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma?.activity.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        display_seq: req.body.display_seq,
        workoutId: req.body.workoutId,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get activity' });
  }
}

async function updateActivity(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma?.activity.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        display_seq: req.body.display_seq,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to patch activity' });
  }
}

async function deleteActivity(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma?.activity.delete({
      where: {
        id: req.body.id as string,
      },
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete activity' });
  }
}
