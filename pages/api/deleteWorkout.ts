import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const workoutId = req.body.id;
    try {
      const workout = await prisma?.workout.delete({
        where: {
          id: workoutId as string,
        },
      });
      res.status(200).json(workout);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong deleting exercise." });
    }
  }
}
