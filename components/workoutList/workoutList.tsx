import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import fetcher from '../../lib/fetcher';
import { styled } from '../../styles/stitches.congif';
import { WorkoutWithActivities } from '../../types/workout';
import DeleteWorkoutDialog from '../deleteWorkoutDialog';
import { Flex } from '../layout';
import Preloader from '../preloader';

type Props = {
  userId: string;
};

const WorkoutList = ({ userId }: Props) => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<WorkoutWithActivities[]>(userId, 'workouts'),
  });

  if (status !== 'success' && !data) return <Preloader label="Loading workouts..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <Flex
      direction="column"
      css={{
        gap: '$sm',
        listStyle: 'none',
      }}
    >
      {data.map(workout => {
        return (
          <Flex
            as="li"
            key={workout.id}
            css={{
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '50px',
              paddingInline: '$lg',
              backgroundColor: '$primary-03',
            }}
          >
            <NextLink href={`/workout/${workout.id}`}>{workout.workout_name}</NextLink>
            <DeleteWorkoutDialog label="" workoutId={workout.id} />
          </Flex>
        );
      })}
    </Flex>
  );
};

const NextLink = styled(Link, {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  color: '$primary-12',
  textDecoration: 'none',
  cursor: 'pointer',
});

export default WorkoutList;
