import { Workout } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Exercise } from "./useWorkout";

const useLoadWorkout = (
  id: string
): [UseQueryResult<Workout>, UseQueryResult<Exercise[]>] => {
  const fetchWorkout = (id: string | undefined): Promise<Workout> =>
    axios.get(`/api/workout?id=${id}`).then((res) => res.data);

  const fetchExercises = (id: string | undefined): Promise<Exercise[]> =>
    axios.get(`/api/exercises?id=${id}`).then((res) => res.data);

  const workoutQuery = useQuery(["workout", id], () =>
    fetchWorkout(id as string)
  );

  const exerciseQuery = useQuery(["exercises", id], () =>
    fetchExercises(id as string)
  );

  return [workoutQuery, exerciseQuery];
};

export default useLoadWorkout;
