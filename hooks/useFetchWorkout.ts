import { Exercise, Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "getWorkout" | "getAllWorkouts";

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
  initialData: WorkoutWithExercises | Workout[]
) => {
  const uniqueKey: string = endPoint === "getWorkout" ? "workout" : "workouts";

  return useQuery({
    queryKey: [uniqueKey, id, endPoint],
    queryFn: () => fetchWorkout(id, endPoint),
    initialData: initialData,
  });
};

export default useFetchWorkout;
