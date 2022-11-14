import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const workoutId = req.query.id;
    try {
      const workout = await prisma?.workout.findUnique({
        where: {
          id: workoutId as string,
        },
        include: {
          exercises: {
            orderBy: {
              display_seq: "asc",
            },
          },
        },
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong getting workout" });
    }
  }
}
