import { Exercise, Workout } from "@prisma/client";

const updateDisplaySeq = <T extends Exercise | Workout>(
  items: T[],
  mutation: any
): T[] => {
  return items.map((item, index) => {
    mutation.mutate({
      id: item.id,
      display_seq: index,
    });

    return { ...item, display_seq: index };
  });
};

export default updateDisplaySeq;
