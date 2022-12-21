import { useCallback, useContext, useReducer, useState } from "react";
import useInterval from "./useInterval";
import { CounterContext } from "../components/counterProvider/counterProvider";
import { ExerciseWithTimestamp, FormattedWorkout } from "./useWorkout";

export const TIMER_INTERVAL: 1000 = 1000;

type CounterState = {
  runningTime: number;
  exercises: ExerciseWithTimestamp[];
  setCount: number;
  runningExercise: ExerciseWithTimestamp;
  runningExerciseTime: number;
  nextExercise: ExerciseWithTimestamp;
};

type CounterActions = {
  type:
    | "UPDATE_RUNNING_TIMER"
    | "UPDATE_EXERCISE"
    | "UPDATE_RUNNING_EXERCISE_TIMER";
  payload?: any;
};

const counterReducer = (state: CounterState, action: CounterActions) => {
  switch (action.type) {
    case "UPDATE_RUNNING_TIMER":
      return {
        ...state,
        runningTime: state.runningTime - TIMER_INTERVAL,
      };
    case "UPDATE_EXERCISE":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_RUNNING_EXERCISE_TIMER":
      return {
        ...state,
        runningExerciseTime: state.runningExerciseTime - TIMER_INTERVAL,
      };
    default:
      return state;
  }
};

export default function useTimer(workoutData: FormattedWorkout) {
  const { isTimer, setIsTimer, setIsTimerDone } = useContext(CounterContext);

  const [state, dispatch] = useReducer(counterReducer, {
    runningTime: workoutData.totalTime,
    exercises: workoutData.formattedWorkout,
    setCount: 1,
    runningExercise: workoutData.formattedWorkout[0],
    runningExerciseTime: workoutData.formattedWorkout[0].duration,
    nextExercise: workoutData.formattedWorkout[1],
  });

  function updateTimer() {
    dispatch({ type: "UPDATE_RUNNING_TIMER" });

    for (let exercise of state.exercises) {
      if (!exercise.timestamp) return;
      if (
        state.runningTime <= exercise.timestamp.start &&
        state.runningTime >= exercise.timestamp.end
      ) {
        if (state.runningExercise !== exercise) {
          dispatch({
            type: "UPDATE_EXERCISE",
            payload: {
              setCount:
                exercise.type === "SET_REST"
                  ? state.setCount + 1
                  : state.setCount,
              runningExercise: exercise,
              runningExerciseTime: exercise.duration,
              nextExercise:
                state.exercises[state.exercises.indexOf(exercise) + 1],
            },
          });
        }
      }
    }
    dispatch({ type: "UPDATE_RUNNING_EXERCISE_TIMER" });

    if (state.runningTime <= 1000) {
      console.log("Workout Done");
      setIsTimer(false);
      setIsTimerDone(true);
    }
  }

  useInterval(updateTimer, isTimer ? TIMER_INTERVAL : null);
  return [state as CounterState];
}
