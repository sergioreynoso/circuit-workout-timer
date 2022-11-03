import { Workout } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "updateWorkout" | "createWorkout" | "deleteWorkout";

const useWorkoutMutation = (endpoint: Endpoint, onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (workout: Partial<Workout>) => axios.post(`/api/${endpoint}`, workout),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        onSuccess();
      },
    }
  );
};

export default useWorkoutMutation;
