import { Exercise, Workout } from "@prisma/client";

const updateDisplaySeq = <T extends Exercise | Workout>(items: T[]): T[] => {
  return items.map((item, index) => {
    return { ...item, display_seq: index };
  });
};

export default updateDisplaySeq;
