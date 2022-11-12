import { Exercise } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Endpoint =
  | "updateExercise"
  | "createExercise"
  | "deleteExercise"
  | "updateExerciseOrder";

const useExerciseMutation = (endpoint: Endpoint, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (exercise: Partial<Exercise>) => axios.post(`/api/${endpoint}`, exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workout"]);
        if (onSuccess) onSuccess();
      },
    }
  );
};

export default useExerciseMutation;
