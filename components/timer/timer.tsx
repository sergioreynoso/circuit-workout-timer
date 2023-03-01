import { useContext, useEffect, useMemo } from 'react';
import useTimer, { CounterState } from '../../hooks/useTimer';

import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';

import { WorkoutWithActivities } from '../../types/workout';
import { Container } from '../layout';
import ProgressCircle from '../progressCircle';
import { TimerContext } from '../timerContext';
import TimerControl from '../timerControl/timerControl';

type Props = { workoutData: WorkoutWithActivities };

const Timer = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(TimerContext);
  const formattedWorkout = useMemo(() => formatWorkout(workoutData), [workoutData]);

  const [state] = useTimer(formattedWorkout);

  useEffect(() => {
    // console.log(formattedWorkout);
  }, []);

  if (isTimerDone)
    return (
      <Container>
        <WorkoutComplete />
      </Container>
    );

  return (
    <div className="px-4 text-center md:px-0">
      <h2 className="text-3xl font-black leading-9 text-amber-400">{formatTime(state.runningTime)}</h2>
      <p>
        {state.setCount} / {formattedWorkout.totalSets}
      </p>
      <div className="relative">
        <ProgressCircle runningActivity={formattedWorkout} runningActivityTime={state.runningTime} intent="workout">
          <ProgressCircle
            runningActivity={state.runningActivity}
            runningActivityTime={state.runningActivityTime}
            strokeWidth={4}
            intent={'activity'}
          />
        </ProgressCircle>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-10">
          <h2 className="text-3xl font-black leading-9 text-green-500">{formatTime(state.runningActivityTime)}</h2>
          <p className="text-3xl font-bold leading-9 text-gray-300">{state.runningActivity.name}</p>
          <TimerControl />
        </div>
      </div>
      <NextExercise state={state} />
    </div>
  );
};

const NextExercise = ({ state }: { state: CounterState }) => {
  return (
    state.nextActivity && (
      <div className="flex flex-col items-center gap-4 p-4">
        <p className="text-3xl font-light leading-9 text-gray-300">{state.nextActivity.name}</p>
      </div>
    )
  );
};

const WorkoutComplete = () => {
  return (
    <div className="justify-center p-4">
      <p>Complete!</p>
    </div>
  );
};

/*
 <h2 className="text-3xl font-black leading-9 text-green-500">
                  {formatTime(state.runningActivityTime)}
                </h2>
                <p className="text-3xl font-semibold leading-9 text-gray-300">{state.runningActivity.name}</p>
                */

export default Timer;
