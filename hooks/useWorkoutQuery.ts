import { Workout } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const useWorkoutQuery = (id: string): UseQueryResult<Workout> => {
  const fetchWorkout = (id: string): Promise<Workout> =>
    axios.get(`/api/workout?id=${id}`).then((res) => res.data);

  return useQuery(["workout", id], () => fetchWorkout(id));
};

export default useWorkoutQuery;
