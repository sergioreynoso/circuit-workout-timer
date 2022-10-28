import { Exercise } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "exercise" | "createExercise" | "deleteExercise";

const useExerciseMutation = (endpoint: Endpoint, onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (exercise: Partial<Exercise>) => axios.post(`/api/${endpoint}`, exercise),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workout"]);
        onSuccess();
      },
    }
  );
};

export default useExerciseMutation;
