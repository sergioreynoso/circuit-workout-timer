import { Exercise, Workout } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

const useWorkoutQuery = (
  workoutId: string
): UseQueryResult<WorkoutWithExercises> => {
  const fetchWorkout = (workoutId: string): Promise<Workout> =>
    axios
      .get(`/api/getWorkout`, { params: { id: workoutId } })
      .then((res) => res.data);

  return useQuery(["workout", workoutId], () => fetchWorkout(workoutId));
};

export default useWorkoutQuery;
