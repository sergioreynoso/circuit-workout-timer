import { useCallback, useContext, useReducer, useState } from "react";
import useInterval from "./useInterval";
import { CounterContext } from "../components/counterProvider/counterProvider";

export const TIMER_INTERVAL: 1000 = 1000;

type TimerState = {
  runningTime: number;
  isTicking: boolean;
  isDone: boolean;
};

type TimerAction = {
  type: "SET_DURATION" | "SET_IS_RUNNING" | "SET_IS_DONE";
};

const timerReducer = (state: TimerState, action: TimerAction) => {
  switch (action.type) {
    case "SET_DURATION":
      return {
        ...state,
        runningTime: state.runningTime - TIMER_INTERVAL,
      };
    case "SET_IS_RUNNING":
      return {
        ...state,
        isTicking: !state.isTicking,
      };
    case "SET_IS_DONE":
      return {
        ...state,
        isTicking: false,
        isDone: true,
      };
    default:
      return state;
  }
};

export default function useTimer(
  workoutTotalTime: number,
  callback: () => void
) {
  const { isTimer } = useContext(CounterContext);

  const [state, dispatch] = useReducer(timerReducer, {
    runningTime: workoutTotalTime,
    isTicking: false,
    isDone: false,
  });

  const updateTimer = () => {
    dispatch({ type: "SET_DURATION" });
    if (state.runningTime <= 1000) {
      console.log("Workout Done");
      dispatch({ type: "SET_IS_DONE" });
    }
    callback();
  };

  useInterval(updateTimer, isTimer ? TIMER_INTERVAL : null);
  return [state.runningTime, state.isTicking, state.isDone] as const;
}
