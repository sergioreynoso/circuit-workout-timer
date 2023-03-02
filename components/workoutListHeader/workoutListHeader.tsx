import { Workout } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { defaultWorkout } from '../../lib/defaultWorkout';
import Button from '../button/button';

const MAX_WORKOUTS = 5 as const;

const WORKOUT_TEMPLATE = (userId: string, workouts: Workout[]) => ({
  name: 'Untitled Workout',
  set_count: 1,
  set_rest: 10000,
  duration: 0,
  userId: userId,
  display_seq: workouts?.length! + 1,
  activities: defaultWorkout,
});

type Props = {
  userId: string;
  data: Workout[];
};

const WorkoutListHeader = ({ userId, data }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (workout: Optional<Workout, 'id'> & { activities: FormattedActivity[] }) =>
      axios.post('/api/v1/workout', workout),
    onSuccess: ({ data: newData }) => {
      router.push(`/editWorkout/${newData.id}`);
    },
  });

  const onClickHandler = () => {
    console.log('first');
    const workouts = queryClient.getQueryData<Workout[]>(['workouts']);
    if (workouts) mutation.mutate(WORKOUT_TEMPLATE(userId, workouts));
  };

  return (
    <div className="flex items-center justify-between">
      {mutation.isLoading && <Preloader />}
      <div className="flex flex-grow flex-col">
        <h2 className="text-base font-bold leading-7 text-gray-300">Workouts</h2>
        <p className="text-base font-normal leading-6 text-gray-400">Create up to 5 workouts</p>
      </div>
      <Button intent="primary" onClick={onClickHandler} disabled={data.length >= MAX_WORKOUTS}>
        Create Workout
      </Button>
    </div>
  );
};

function Preloader() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900/80">
      <div className="flex h-40 w-52 items-center justify-center rounded-lg bg-gray-800 font-semibold text-gray-300 shadow-md">
        Creating workout...
      </div>
    </div>
  );
}

export default WorkoutListHeader;
