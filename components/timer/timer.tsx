import { useContext, useMemo } from 'react';
import { P } from 'ts-toolbelt/out/Object/_api';
import useTimer from '../../hooks/useTimer';

import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';

import { WorkoutWithActivities } from '../../types/workout';
import { Box, Flex } from '../layout';
import ProgressCircle from '../progressCircle';
import { TimerContext } from '../timerContext';

type Props = { workoutData: WorkoutWithActivities };

const Timer = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(TimerContext);
  const formattedWorkout = useMemo(() => formatWorkout(workoutData), [workoutData]);

  const [state] = useTimer(formattedWorkout);

  const NextExercise = () => {
    return (
      state.nextActivity && (
        <Flex direction="column" css={{ alignItems: 'center', gap: '$sm', padding: '$sm' }}>
          <h4>Next</h4>
          <p>{state.nextActivity.name}</p>
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
          <h2>Time Remaining: {formatTime(state.runningTime)}</h2>
          <p>
            {state.setCount} / {formattedWorkout.totalSets}
          </p>
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
                <h2>{formatTime(state.runningActivityTime)}</h2>
                <p>{state.runningActivity.name}</p>
              </ProgressCircle>
            </Box>
          </Box>
          <NextExercise />
        </>
      )}
    </Box>
  );
};

export default Timer;
