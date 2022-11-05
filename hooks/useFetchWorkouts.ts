import { Exercise, Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Endpoint = "getWorkout" | "getAllWorkouts";

const fetchWorkout = (
  id: string | undefined,
  endPoint: string | undefined
): Promise<Workout | Workout[]> => {
  if (typeof id === "undefined")
    return Promise.reject(new Error("Invalid id."));
  if (typeof endPoint === "undefined")
    return Promise.reject(new Error("Invalid API end point."));

  return axios
    .get(`/api/${endPoint}`, { params: { id: id } })
    .then((res) => res.data);
};

const useFetchWorkouts = (
  endPoint: Endpoint,
  id: string | undefined,
  initialData: Workout | Workout[] | undefined = undefined
) => {
  const uniqueKey: string = endPoint === "getWorkout" ? "workout" : "workouts";

  return useQuery({
    queryKey: [uniqueKey, id, endPoint],
    queryFn: () => fetchWorkout(id, endPoint),
    initialData: initialData,
  });
};

export default useFetchWorkouts;
