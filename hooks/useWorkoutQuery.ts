import { Workout } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const useWorkoutQuery = (workoutId: string): UseQueryResult<Workout> => {
  const fetchWorkout = (workoutId: string): Promise<Workout> =>
    axios
      .get(`/api/workout`, { params: { id: workoutId } })
      .then((res) => res.data);

  return useQuery(["workout", workoutId], () => fetchWorkout(workoutId));
};

export default useWorkoutQuery;
