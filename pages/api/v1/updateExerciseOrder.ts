import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Exercise } from "@prisma/client";

const update = async (exercises: Exercise[]) => {
  let array = [];

  for (const exercise of exercises) {
    const workout = await prisma?.exercise.update({
      where: {
        id: exercise.id,
      },
      data: {
        display_seq: exercise.display_seq,
      },
    });
    array.push(workout);
  }

  return array;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const exercises = req.body;

  if (req.method === "PUT") {
    try {
      const data = await update(exercises);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong updating workout." });
    }
  }
}
