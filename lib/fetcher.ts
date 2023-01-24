import axios from "axios";

type Endpoint = "v1/workouts" | "v1/workout" | "v1/activity" | "v1/activities";

const fetcher = <TData>(id: string, endPoint: Endpoint): Promise<TData> => {
  return axios.get(`/api/${endPoint}`, { params: { id: id } }).then(res => res.data);
};

export default fetcher;
