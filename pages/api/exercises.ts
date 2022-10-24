import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const workoutId = req.query.id;
    try {
      const exercises = await prisma?.exercise.findMany({
        where: {
          workoutId: workoutId as string,
        },
      });
      res.status(200).json(exercises);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Something went wrong loading exercises" });
    }
  }
}
