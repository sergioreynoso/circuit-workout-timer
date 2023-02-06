import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { styled } from '../../styles/stitches.congif';
import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button';
import { TimerContext } from '../timerContext';

type Props = {
  data: WorkoutWithActivities;
};

const TimerHeader = ({ data }: Props) => {
  const { isTimerDone } = useContext(TimerContext);

  const router = useRouter();
  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/dashboard`);
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/editWorkout/${data.id as string}`);
  };

  return (
    <Header>
      {!isTimerDone && <Button onClick={onCancel}>Cancel</Button>}
      <Heading>{data.workout_name}</Heading>
      {!isTimerDone && <Button onClick={onEdit}>Edit</Button>}
    </Header>
  );
};

const Heading = styled('h1', {
  flex: 1,
  fontSize: '$lg',
  lineHeight: '$150',
  textAlign: 'center',
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$2x',
  maxWidth: '$bp-md',
  paddingBlock: '$lg',
});

export default TimerHeader;
