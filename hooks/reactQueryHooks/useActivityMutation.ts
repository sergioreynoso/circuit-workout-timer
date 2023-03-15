import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { endPoints } from '../../lib/endPoints';
import { FormattedActivity } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';

export default function useActivityMutation(workoutId: string) {
  const queryClient = useQueryClient();

  const createActivity = useMutation({
    mutationFn: (activity: Omit<FormattedActivity, 'id'>) => axios.post(`/api/v1/activity`, activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
    },
  });

  const updateActivity = useMutation({
    mutationFn: (data: FormattedActivity) => axios.patch(endPoints.activity, data),
    onMutate: newData => {
      queryClient.setQueryData(['workout', workoutId], (oldData: WorkoutWithActivities | undefined) => {
        if (oldData) {
          const oldActivityIndex = oldData.activities.findIndex(item => item.id === newData.id);
          oldData.activities[oldActivityIndex] = newData;
          return oldData;
        }
      });
    },
    //TODO:Add onError handler.
  });

  const deleteActivity = useMutation({
    mutationFn: (id: string) => axios.delete(endPoints.activity, { data: { id: id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
    },
  });

  return { createActivity, updateActivity, deleteActivity };
}
