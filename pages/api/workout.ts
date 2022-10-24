import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const workout = await prisma?.workout.findUnique({
        where: {
          id: req.query.id as string,
        },
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong getting workout" });
    }
  }

  if (req.method === "POST") {
    try {
      const workout = await prisma?.workout.update({
        where: {
          id: req.body.id,
        },
        data: {
          workout_name: req.body.name,
          set_count: req.body.set,
          set_rest: req.body.rest,
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
