import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const workout = await prisma?.exercise.update({
        where: {
          id: req.body.id,
        },
        data: {
          exercise_name: req.body.exercise_name,
          type: req.body.type,
          duration: req.body.duration,
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
