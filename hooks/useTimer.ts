import { useContext, useReducer } from 'react';
import { TimerContext } from '../components/timerContext';
import { FormattedActivity, FormattedWorkout } from './useFormatWorkout';
import useInterval from './useInterval';

export const TIMER_INTERVAL: 1000 = 1000;

type CounterState = {
  runningTime: number;
  activity: FormattedActivity[];
  setCount: number;
  runningActivity: FormattedActivity;
  runningActivityTime: number;
  nextActivity: FormattedActivity;
};

type CounterActions = {
  type: 'UPDATE_RUNNING_TIMER' | 'UPDATE_ACTIVITY' | 'UPDATE_RUNNING_ACTIVITY_TIMER';
  payload?: any;
};

const counterReducer = (state: CounterState, action: CounterActions) => {
  switch (action.type) {
    case 'UPDATE_RUNNING_TIMER':
      return {
        ...state,
        runningTime: state.runningTime - TIMER_INTERVAL,
      };
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_RUNNING_ACTIVITY_TIMER':
      return {
        ...state,
        runningActivityTime: state.runningActivityTime - TIMER_INTERVAL,
      };
    default:
      return state;
  }
};

export default function useTimer(workoutData: FormattedWorkout) {
  const { isTimer, setIsTimer, setIsTimerDone } = useContext(TimerContext);

  const [state, dispatch] = useReducer(counterReducer, {
    runningTime: workoutData.duration,
    activities: workoutData.activities,
    setCount: 1,
    runningActivity: workoutData.activities[0],
    runningActivityTime: workoutData.activities[0].duration,
    nextActivity: workoutData.activities[1],
  });

  function updateTimer() {
    dispatch({ type: 'UPDATE_RUNNING_TIMER' });

    for (let activity of state.activities) {
      if (!activity.timestamp) return;
      if (state.runningTime <= activity.timestamp.start && state.runningTime >= activity.timestamp.end) {
        if (state.runningActivity !== activity) {
          dispatch({
            type: 'UPDATE_ACTIVITY',
            payload: {
              setCount: activity.type === 'SET_REST' ? state.setCount + 1 : state.setCount,
              runningActivity: activity,
              runningActivityTime: activity.duration,
              nextActivity: state.activities[state.activities.indexOf(activity) + 1],
            },
          });
        }
      }
    }
    dispatch({ type: 'UPDATE_RUNNING_ACTIVITY_TIMER' });

    if (state.runningTime === 0) {
      console.log('Workout Done');
      setIsTimer(false);
      setIsTimerDone(true);
    }
  }

  useInterval(updateTimer, isTimer ? TIMER_INTERVAL : null);
  return [state as CounterState];
}
