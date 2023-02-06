import axios from 'axios';
import { endPoints, EndPoints } from './endPoints';

const fetcher = <TData>(id: string, endPoint: EndPoints): Promise<TData> => {
  return axios.get(endPoints[endPoint], { params: { id: id } }).then(res => res.data);
};

export default fetcher;
