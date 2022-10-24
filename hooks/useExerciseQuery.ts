import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { ExerciseWithTimestamp } from "./useWorkout";

const useExerciseQuery = (
  id: string
): UseQueryResult<ExerciseWithTimestamp[]> => {
  const fetchExercises = (
    id: string | undefined
  ): Promise<ExerciseWithTimestamp[]> =>
    axios.get(`/api/exercises?id=${id}`).then((res) => res.data);

  return useQuery(["exercises", id], () => fetchExercises(id as string));
};

export default useExerciseQuery;
