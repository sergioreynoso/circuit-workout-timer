import { Exercise, Workout } from '@prisma/client';

const updateDisplaySeq = <T extends Exercise | Workout>(items: T[]): T[] => {
  return items.map((item, index) => {
    return { ...item, display_seq: index + 1 };
  });
};

export default updateDisplaySeq;
