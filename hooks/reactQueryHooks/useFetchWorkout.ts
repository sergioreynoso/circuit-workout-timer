import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import fetcher from '../../lib/fetcher';
import { WorkoutWithActivities } from '../../types/workout';

export default function useFetchWorkout(workoutId: string) {
  const session = useSession();

  console.log(session);

  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => fetcher<WorkoutWithActivities>(workoutId, 'workout'),
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });
}
