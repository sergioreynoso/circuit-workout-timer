import { Workout } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { defaultWorkout } from '../../lib/defaultWorkout';
import fetcher from '../../lib/fetcher';
import { WorkoutWithActivities } from '../../types/workout';
import useWorkoutMutation from './useWorkoutMutation';

export default function useFetchWorkoutList(userId: string) {
  const session = useSession();
  const queryClient = useQueryClient();
  const { createWorkout } = useWorkoutMutation('');

  return useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<Workout[]>(userId, 'workouts'),
    onSuccess: data => {
      if (data.length === 0) {
        createWorkout.mutate(defaultWorkout(userId), {
          onSuccess: () => {
            queryClient.invalidateQueries(['workouts']);
          },
        });
      }
    },
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  });
}
