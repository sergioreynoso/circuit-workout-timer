import { Exercise } from "@prisma/client";
import { useEffect } from "react";
import useExerciseMutation from "./useExerciseMutation";

const useUpdateExerciseOrder = (exercise: Exercise) => {
  const mutation = useExerciseMutation("updateExerciseOrder");
  function update() {
    mutation.mutate({
      id: exercise.id,
      display_seq: exercise.display_seq,
    });
  }

  useEffect(() => {
    update();
  }, [exercise]);
};

export default useUpdateExerciseOrder;
