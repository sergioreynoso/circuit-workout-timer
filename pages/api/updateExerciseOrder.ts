import { prisma } from "../../lib/prisma";
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
          display_seq: req.body.display_seq,
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
