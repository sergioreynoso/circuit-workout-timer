import { Workout } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import Button from '../button';
import { Flex } from '../layout';

type Props = {
  userId: string;
};

const activities: (FormattedActivity & { display_seq: number })[] = [
  {
    activity_name: 'First Exercise',
    display_seq: 1,
    duration: 30000,
    type: 'WORK',
  },
];

const WorkoutListHeader = ({ userId }: Props) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (workout: Workout & { activities: FormattedActivity[] }) => axios.post('/api/v1/workout', workout),
    onSuccess: ({ data: newData }) => {
      router.push(`/createWorkout/${newData.id}`);
    },
  });

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    mutation.mutate({
      id: '',
      workout_name: 'Untitled Workout',
      set_count: 1,
      set_rest: 10000,
      userId: userId,
      display_seq: 0,
      activities: activities,
    });
  };

  return (
    <Flex
      css={{
        justifyContent: 'space-between',
        gap: '$lg',
        paddingBlock: '$2x',
      }}
    >
      <Flex direction="column" css={{ gap: '$sm' }}>
        <h2>Build Workout</h2>
        <p>Add exercises or rests between exercises. </p>
      </Flex>

      <Button colors="primary" onClick={onClickHandler}>
        Add Workout
      </Button>
    </Flex>
  );
};

export default WorkoutListHeader;
