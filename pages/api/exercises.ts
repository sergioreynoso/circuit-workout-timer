import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const exercises = await prisma?.exercise.findMany({
        where: {
          workoutId: req.query.id as string,
        },
      });
      res.status(200).json(exercises);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
