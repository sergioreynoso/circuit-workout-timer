import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { ExerciseWithTimestamp } from "./useWorkout";

const useExerciseQuery = (
  workoutId: string
): UseQueryResult<ExerciseWithTimestamp[]> => {
  const fetchExercises = (
    id: string | undefined
  ): Promise<ExerciseWithTimestamp[]> =>
    axios
      .get(`/api/exercises`, { params: { id: workoutId } })
      .then((res) => res.data);

  return useQuery(["exercises", workoutId], () => fetchExercises(workoutId));
};

export default useExerciseQuery;
