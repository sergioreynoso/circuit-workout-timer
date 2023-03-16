import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { WorkoutWithActivities } from '../../types/workout';

export default function useFetchWorkout(id: string) {
  return useQuery({
    queryKey: ['workout', id],
    queryFn: () => (id ? fetcher<WorkoutWithActivities>(id, 'workout') : null),
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });
}
