import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const data = req.body.exercises;

  if (req.method === "POST") {
    try {
      await prisma.$transaction([
        prisma.exercise.deleteMany({
          where: {
            workout: {
              id: id,
            },
          },
        }),
        prisma.exercise.createMany({
          data: data,
        }),
      ]);

      res.status(200).json({ status: "success", message: "Updated activities" });
    } catch (error) {
      res.status(400).json({ status: "failed", message: "Something went wrong updating workout." });
    }
  }
}
