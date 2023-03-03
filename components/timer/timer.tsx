import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';
import useTimer, { CounterState } from '../../hooks/useTimer';

import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';

import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button/button';
import { Container } from '../layout';
import ProgressCircle from '../progressCircle';
import { TimerContext } from '../timerContext';
import TimerControl from '../timerControl/timerControl';

type Props = { workoutData: WorkoutWithActivities };

const Timer = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(TimerContext);
  const formattedWorkout = useMemo(() => formatWorkout(workoutData), [workoutData]);

  const [state] = useTimer(formattedWorkout);

  if (isTimerDone)
    return (
      <div className="px-4 text-center md:px-0">
        <WorkoutComplete />
      </div>
    );

  return (
    <div className="px-4 text-center md:px-0">
      <h2 className="text-3xl font-black leading-9 text-amber-400">{formatTime(state.runningTime)}</h2>
      <p className="mt-4 mb-4">
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
        <p>Next</p>
        <p className="text-3xl font-light leading-9 text-gray-300">{state.nextActivity.name}</p>
      </div>
    )
  );
};

const WorkoutComplete = () => {
  const router = useRouter();

  return (
    <div className="mt-6 flex h-20 flex-col items-center justify-center gap-4 rounded-lg bg-gray-800 p-40">
      <p className="text-4xl font-extrabold leading-relaxed text-gray-300">Workout Complete!</p>
      <Button intent="primary" onClick={() => router.push(`/dashboard`)}>
        Done
      </Button>
    </div>
  );
};

export default Timer;
