import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const exerciseId = req.query.id;
    try {
      const workout = await prisma?.exercise.delete({
        where: {
          id: exerciseId as string,
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
