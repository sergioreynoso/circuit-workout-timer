import { prisma } from '../../../lib/prisma';

import { NextApiRequest, NextApiResponse } from 'next';

async function postActivity(req: NextApiRequest) {
  const data = await prisma?.exercise.create({
    data: {
      exercise_name: req.body.exercise_name,
      type: req.body.type,
      duration: req.body.duration,
      display_seq: req.body.display_seq,
      workoutId: req.body.workoutId,
    },
  });
  return data;
}

async function updateActivity(req: NextApiRequest) {
  const data = await prisma?.exercise.update({
    where: {
      id: req.body.id,
    },
    data: {
      exercise_name: req.body.exercise_name,
      type: req.body.type,
      duration: req.body.duration,
      display_seq: req.body.display_seq,
    },
  });
  return data;
}

async function deleteActivity(req: NextApiRequest) {
  const data = await prisma?.exercise.delete({
    where: {
      id: req.body.id as string,
    },
  });
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const data = await postActivity(req);
      res.status(200).json(data);
    }
    if (req.method === 'PUT') {
      const data = await updateActivity(req);
      res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const data = await deleteActivity(req);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Failed to update activity' });
  }
}
