import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const workout = await prisma?.workout.create({
        data: {
          workout_name: req.body.workout_name,
          set_count: req.body.set_count,
          set_rest: req.body.set_rest,
          userId: req.body.userId,
          exercises: {
            create: req.body.exerciseList,
          },
        },
        include: {
          exercises: true,
        },
      });
      res.status(200).json(workout);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong updating workout." });
    }
  }
}
