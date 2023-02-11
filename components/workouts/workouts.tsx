import { Workout } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import fetcher from '../../lib/fetcher';
import { Container } from '../layout';
import Preloader from '../preloader/preloader';
import WorkoutListHeader from '../workoutListHeader';
import WorkoutSortableList from '../workoutSortableList';

const Workouts = ({ userId }: { userId: string }) => {
  const { status, data, error } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<Workout[]>(userId, 'workouts'),
  });

  if (status !== 'success' && !data) return <Preloader label="Loading workouts..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <>
      <WorkoutListHeader userId={userId} />
      <WorkoutSortableList data={data} />
    </>
  );
};

export default Workouts;
