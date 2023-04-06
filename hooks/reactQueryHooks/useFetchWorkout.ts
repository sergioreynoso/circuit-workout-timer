import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { WorkoutWithActivities } from '../../types/workout';

export default function useFetchWorkout(workoutId: string) {
  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => fetcher<WorkoutWithActivities>(workoutId, 'workout'),
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });
}
