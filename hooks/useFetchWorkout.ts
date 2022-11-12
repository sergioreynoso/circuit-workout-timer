import { Exercise, Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "getWorkout" | "getAllWorkouts";
type QueryKey = "workout" | "workouts";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

const fetchWorkout = (
  id: string,
  endPoint: string
): Promise<WorkoutWithExercises | Workout[]> => {
  return axios
    .get(`/api/${endPoint}`, { params: { id: id } })
    .then((res) => res.data);
};

const useFetchWorkout = (
  endPoint: Endpoint,
  id: string,
  queryKey: QueryKey,
  initialData: WorkoutWithExercises | Workout[]
) => {
  return useQuery({
    queryKey: [queryKey, id, endPoint],
    queryFn: () => fetchWorkout(id, endPoint),
    initialData: initialData,
  });
};

export default useFetchWorkout;
