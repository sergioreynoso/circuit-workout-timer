import { Workout } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const useAllWorkoutsQuery = (userId: string): UseQueryResult<Workout[]> => {
  const fetchWorkouts = (userId: string): Promise<Workout[]> =>
    axios.get(`/api/workouts?id=${userId}`).then((res) => res.data);

  return useQuery(["workouts", userId], () => fetchWorkouts(userId));
};

export default useAllWorkoutsQuery;
