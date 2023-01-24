import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getWorkout(req: NextApiRequest) {
  const data = await prisma?.workout.findUnique({
    where: {
      id: req.query.id as string,
    },
    include: {
      exercises: {
        orderBy: {
          display_seq: "asc",
        },
      },
    },
  });
  return data;
}

async function postWorkout(req: NextApiRequest) {
  const data = await prisma?.workout.create({
    data: {
      workout_name: req.body.workout_name,
      set_count: req.body.set_count,
      set_rest: req.body.set_rest,
      userId: req.body.userId,
      display_seq: req.body.display_seq,
      exercises: {
        create: req.body.exerciseList,
      },
    },
    include: {
      exercises: true,
    },
  });
  return data;
}

async function updateWorkout(req: NextApiRequest) {
  const data = await prisma?.workout.update({
    where: {
      id: req.body.id,
    },
    data: {
      workout_name: req.body.workout_name,
      set_count: req.body.set_count,
      set_rest: req.body.set_rest,
    },
    include: {
      exercises: true,
    },
  });
  return data;
}

async function deleteWorkout(req: NextApiRequest) {
  const data = await prisma?.workout.delete({
    where: {
      id: req.body.id as string,
    },
  });
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const data = await getWorkout(req);
      res.status(200).json(data);
    }
    if (req.method === "POST") {
      const data = await postWorkout(req);
      res.status(200).json(data);
    }
    if (req.method === "PUT") {
      const data = await updateWorkout(req);
      res.status(200).json(data);
    }
    if (req.method === "DELETE") {
      const data = await deleteWorkout(req);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Failed to load or create workout" });
  }
}
