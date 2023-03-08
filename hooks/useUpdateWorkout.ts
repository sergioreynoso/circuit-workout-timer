import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { endPoints } from '../lib/endPoints';

export default function useUpdateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workout: Partial<Workout>) => axios.patch(endPoints.workout, workout),
    onMutate: newData => {
      const oldData = queryClient.getQueryData<Workout>(['workout', newData.id]);
      queryClient.setQueryData(['workout', newData.id], { ...oldData, ...newData });
    },
  });
}
