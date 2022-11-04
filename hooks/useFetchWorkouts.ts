import { Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getWorkout = (userId: string): Promise<Workout[]> =>
  axios
    .get(`/api/getAllWorkouts`, { params: { id: userId } })
    .then((res) => res.data);

const useFetchWorkouts = (
  userId: string,
  initialData: Workout[] | undefined
) => {
  return useQuery({
    queryKey: ["workouts", userId],
    queryFn: () => getWorkout(userId),
    initialData: initialData,
  });
};

export default useFetchWorkouts;
