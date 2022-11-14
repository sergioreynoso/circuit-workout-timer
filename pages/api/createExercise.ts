import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const exercise = await prisma?.exercise.create({
        data: {
          exercise_name: req.body.exercise_name,
          type: req.body.type,
          duration: req.body.duration,
          display_seq: req.body.display_seq,
          workoutId: req.body.workoutId,
        },
      });
      res.status(200).json(exercise);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong updating workout." });
    }
  }
}
