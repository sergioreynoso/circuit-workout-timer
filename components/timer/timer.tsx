import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useTimer, { CounterState } from '../../hooks/useTimer';

import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';

import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button/button';
import ProgressCircle from '../progressCircle';
import { TimerContext } from '../timerContext';
import TimerControl from '../timerControl/timerControl';

type Props = { workoutData: WorkoutWithActivities };

const Timer = ({ workoutData }: Props) => {
  const [activityHalfWay, setActivityHalfway] = useState(false);
  const { isTimerDone, isTimer, isTimerStart } = useContext(TimerContext);
  const formattedWorkout = useMemo(() => formatWorkout(workoutData), [workoutData]);
  const msg = useMemo(() => new SpeechSynthesisUtterance(), []);

  const [state] = useTimer(formattedWorkout);
  const isHalfwayThere = useMemo(
    () => state.runningActivityTime <= Math.ceil(state.runningActivity.duration / 2),
    [state.runningActivityTime, state.runningActivity.duration]
  );

  useEffect(() => {
    msg.text = `${state.runningActivity.name}`;
    activityHalfWay && setActivityHalfway(false);
    if (isTimer) window.speechSynthesis.speak(msg);
  }, [isTimer, state.runningActivity.name, msg, activityHalfWay]);

  useEffect(() => {
    msg.text = 'workout complete.';
    isTimerDone && window.speechSynthesis.speak(msg);
  }, [isTimerDone, msg]);

  useEffect(() => {
    if (isHalfwayThere) {
      msg.text = 'Halfway there.';
      window.speechSynthesis.speak(msg);
    }
  }, [isHalfwayThere, msg]);

  if (isTimerDone) {
    return (
      <div className="px-4 text-center md:px-0">
        <WorkoutComplete />
      </div>
    );
  }

  return (
    <div className="px-4 text-center md:px-0">
      <div className={` ${!isTimer && isTimerStart && 'opacity-20'} transition-opacity`}>
        <h2 className="text-3xl font-black leading-9 text-amber-400 ">{formatTime(state.runningTime)}</h2>
        <p className={`${!isTimerStart && 'opacity-0'} mt-4 mb-4`}>
          {state.setCount} / {formattedWorkout.totalSets}
        </p>
      </div>
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
          <h2
            className={`text-3xl font-black leading-9 text-green-500 ${!isTimerStart && 'opacity-0'} ${
              !isTimer && isTimerStart && 'opacity-20'
            } transition-opacity`}
          >
            {formatTime(state.runningActivityTime)}
          </h2>
          {!isTimerStart ? (
            <p className="text-3xl font-bold leading-9 text-amber-300">Tap to start</p>
          ) : (
            <p className="text-3xl font-bold leading-9 text-gray-300">{state.runningActivity.name}</p>
          )}
          <TimerControl />
        </div>
      </div>
      <div className={`${!isTimerStart && 'opacity-0'} ${!isTimer && isTimerStart && 'opacity-20'} transition-opacity`}>
        {isTimerStart && <NextExercise state={state} />}
      </div>
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
