import { Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "getWorkout" | "getAllWorkouts";

const useFetchWorkouts = (
  endpoint: Endpoint,
  id: string,
  initialData: Workout | Workout[] | undefined = undefined
) => {
  const fetchWorkout = (id: string): Promise<Workout[]> =>
    axios
      .get(`/api/${endpoint}`, { params: { id: id } })
      .then((res) => res.data);

  return useQuery({
    queryKey: ["workouts", id],
    queryFn: () => fetchWorkout(id),
    initialData: initialData,
  });
};

export default useFetchWorkouts;
