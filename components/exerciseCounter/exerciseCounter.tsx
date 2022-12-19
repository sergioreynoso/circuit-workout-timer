import React, { useReducer } from "react";
import { styled } from "../../styles/stitches.congif";
import {
  ExerciseWithTimestamp,
  FormattedWorkout,
} from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { Box, Flex } from "../layout";
import useTimer, { TIMER_INTERVAL } from "../../hooks/useTimer";
import TimerControls from "../../components/timerControl";

type CounterState = {
  exercises: ExerciseWithTimestamp[];
  setCount: number;
  runningExercise: ExerciseWithTimestamp;
  runningExerciseTimer: number;
  nextExercise: ExerciseWithTimestamp;
};

type CounterActions = {
  type: "UPDATE" | "UPDATE_RUNNING_EXERCISE_TIMER";
  payload?: any;
};

type Props = { workoutData: FormattedWorkout };

const counterReducer = (state: CounterState, action: CounterActions) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_RUNNING_EXERCISE_TIMER":
      return {
        ...state,
        runningExerciseTimer: state.runningExerciseTimer - TIMER_INTERVAL,
      };
    default:
      return state;
  }
};

const ExerciseCounter = ({ workoutData }: Props) => {
  const [state, dispatch] = useReducer(counterReducer, {
    exercises: workoutData.formattedWorkout,
    setCount: 1,
    runningExercise: workoutData.formattedWorkout[0],
    runningExerciseTimer: workoutData.formattedWorkout[0].duration,
    nextExercise: workoutData.formattedWorkout[1],
  });

  const [remainingTime, isTimerRunning, isTimerDone] = useTimer(
    workoutData.totalTime,
    timerCallBack
  );

  function timerCallBack() {
    for (let exercise of state.exercises) {
      if (!exercise.timestamp) return;
      if (
        remainingTime <= exercise.timestamp.start &&
        remainingTime >= exercise.timestamp.end
      ) {
        if (state.runningExercise !== exercise) {
          dispatch({
            type: "UPDATE",
            payload: {
              setCount:
                exercise.type === "SET_REST"
                  ? state.setCount + 1
                  : state.setCount,
              runningExercise: exercise,
              runningExerciseTimer: exercise.duration,
              nextExercise:
                state.exercises[state.exercises.indexOf(exercise) + 1],
            },
          });
        }
      }
    }
    dispatch({ type: "UPDATE_RUNNING_EXERCISE_TIMER" });
  }

  const NextExercise = () => {
    return (
      state.nextExercise && (
        <Flex direction="column" css={{ alignItems: "center", gap: "$sm" }}>
          <h4>Up next:</h4>
          <NextExerciseName>
            {state.nextExercise.exercise_name}
          </NextExerciseName>
        </Flex>
      )
    );
  };

  return (
    <Flex
      direction="column"
      css={{ alignItems: "center", backgroundColor: "$gray-05" }}>
      {isTimerDone ? (
        <Flex>
          <p>Workout Complete!</p>
        </Flex>
      ) : (
        <>
          <p>Time Remaining: {formatTime(remainingTime)}</p>
          <ExerciseRemainingTime>
            {formatTime(state.runningExerciseTimer)}
          </ExerciseRemainingTime>
          <Sets>
            {state.setCount} / {workoutData.totalSets}
          </Sets>
          <Exercise>{state.runningExercise.exercise_name}</Exercise>
          <NextExercise />
        </>
      )}
    </Flex>
  );
};

const ExerciseRemainingTime = styled("h2", {
  fontSize: "$3x",
  lineHeight: "$150",
  padding: "$lg",
});

const Exercise = styled("p", {
  fontSize: "$3x",
  fontWeight: "$700",
  lineHeight: "$150",
  color: "$primary-09",
});

const NextExerciseName = styled("p", {
  fontSize: "$xx",
  fontWeight: "$700",
  lineHeight: "$150",
});

const Sets = styled("p", {
  fontSize: "$xx",
  fontWeight: "$700",
  lineHeight: "$150",
});

export default ExerciseCounter;
