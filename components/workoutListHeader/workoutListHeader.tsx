import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { defaultWorkout } from '../../lib/defaultWorkout';

type Props = {
  userId: string;
};

const WorkoutListHeader = ({ userId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (workout: Optional<Workout, 'id'> & { activities: FormattedActivity[] }) =>
      axios.post('/api/v1/workout', workout),
    onSuccess: ({ data: newData }) => {
      router.push(`/createWorkout/${newData.id}`);
    },
  });

  const onClickHandler = () => {
    const workouts = queryClient.getQueryData<Workout[]>(['workouts']);
    mutation.mutate({
      name: 'Untitled Workout',
      set_count: 1,
      set_rest: 10000,
      duration: 0,
      userId: userId,
      display_seq: workouts?.length! + 1,
      activities: defaultWorkout,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-extrabold leading-7 text-gray-100">Workouts</h2>
      <p className="text-base font-normal leading-6 text-gray-400">Create up to 5 workouts</p>
    </div>
  );
};

export default WorkoutListHeader;
