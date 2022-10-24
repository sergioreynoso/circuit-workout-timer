import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.id;
    try {
      const workouts = await prisma?.workout.findMany({
        where: {
          userId: userId as string,
        },
      });
      res.status(200).json(workouts);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
