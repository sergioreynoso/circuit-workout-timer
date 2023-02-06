import { useContext } from 'react';
import { useFormatWorkout } from '../../hooks/useFormatWorkout';
import useTimer from '../../hooks/useTimer';

import { formatTime } from '../../lib/formatTime';

import { styled } from '../../styles/stitches.congif';
import { WorkoutWithActivities } from '../../types/workout';
import { Box, Flex } from '../layout';
import ProgressCircle from '../progressCircle';
import { TimerContext } from '../timerContext';

type Props = { workoutData: WorkoutWithActivities };

const Timer = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(TimerContext);
  const formattedWorkout = useFormatWorkout(workoutData);

  const [state] = useTimer(formattedWorkout);

  const NextExercise = () => {
    return (
      state.nextActivity && (
        <Flex direction="column" css={{ alignItems: 'center', gap: '$sm', padding: '$sm' }}>
          <h4>Next</h4>
          <NextExerciseName>{state.nextActivity.activity_name}</NextExerciseName>
        </Flex>
      )
    );
  };

  const WorkoutComplete = () => {
    return (
      <Flex css={{ justifyContent: 'center', padding: '$sm' }}>
        <p>Complete!</p>
      </Flex>
    );
  };

  return (
    <Box
      css={{
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {isTimerDone ? (
        <WorkoutComplete />
      ) : (
        <>
          <RunningTime>Time Remaining: {formatTime(state.runningTime)}</RunningTime>
          <Sets>
            {state.setCount} / {formattedWorkout.totalSets}
          </Sets>
          <Box css={{ position: 'relative' }}>
            <ProgressCircle runningActivity={formattedWorkout} runningActivityTime={state.runningTime} color="orange" />
            <Box
              css={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <ProgressCircle
                runningActivity={state.runningActivity}
                runningActivityTime={state.runningActivityTime}
                scale={0.95}
              >
                <ExerciseRemainingTime>{formatTime(state.runningActivityTime)}</ExerciseRemainingTime>
                <Exercise>{state.runningActivity.activity_name}</Exercise>
              </ProgressCircle>
            </Box>
          </Box>
          <NextExercise />
        </>
      )}
    </Box>
  );
};

const RunningTime = styled('h2', {
  lineHeight: '$100',
  padding: '$sm',
  color: 'orange',
});

const ExerciseRemainingTime = styled('h2', {
  fontSize: '$3x',
  lineHeight: '$150',
  padding: '$sm',
});

const Exercise = styled('p', {
  fontSize: '$3x',
  fontWeight: '$700',
  lineHeight: '$150',
  color: '$primary-09',
});

const NextExerciseName = styled('p', {
  fontSize: '$xx',
  fontWeight: '$700',
  lineHeight: '$150',
});

const Sets = styled('p', {
  fontSize: '$xx',
  fontWeight: '$700',
  lineHeight: '$150',
});

export default Timer;
