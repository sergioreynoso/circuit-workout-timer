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
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
