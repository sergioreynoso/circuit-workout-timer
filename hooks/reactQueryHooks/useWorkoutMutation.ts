import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { endPoints } from '../../lib/endPoints';
import { FormattedActivity } from '../../lib/formatWorkout';

export default function useWorkoutMutation(workoutId: string) {
  const queryClient = useQueryClient();
  const createWorkout = useMutation({
    mutationFn: (workout: Optional<Workout, 'id'> & { activities: FormattedActivity[] }) =>
      axios.post('/api/v1/workout', workout),
  });

  const updateWorkout = useMutation({
    mutationFn: (workout: Partial<Workout>) => axios.patch(endPoints.workout, workout),
    onMutate: newData => {
      const oldData = queryClient.getQueryData<Workout>(['workout', newData.id]);
      queryClient.setQueryData(['workout', newData.id], { ...oldData, ...newData });
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: (id: string) => axios.delete(endPoints.workout, { data: { id: id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'], refetchType: 'all' });
      queryClient.refetchQueries(['workouts']);
    },
  });

  return { createWorkout, updateWorkout, deleteWorkout };
}
