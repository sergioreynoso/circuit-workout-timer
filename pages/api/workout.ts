import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Workouts } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const workouts = await prisma?.workouts.findFirst({
        where: {
          userId: req.query.id as string,
        },
      });
      res.status(200).json(workouts);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
  if (req.method === "POST") {
    try {
      // await prisma.note.create({
      //   data: {
      //     title,
      //     content,
      //   },
      // });
      res.status(200).json({ message: "Workout Created" });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
