import { Exercise } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Endpoint =
  | "updateExercise"
  | "createExercise"
  | "deleteExercise"
  | "updateExerciseOrder";

const useMutateActivity = (
  endpoint: Endpoint,
  onSuccess?: () => void,
  isInvalidate: boolean = true
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (exercise: Partial<Exercise>) => axios.post(`/api/${endpoint}`, exercise),
    {
      onSuccess: () => {
        if (isInvalidate) queryClient.invalidateQueries(["workout"]);
        if (onSuccess) onSuccess();
      },
    }
  );
};

export default useMutateActivity;
