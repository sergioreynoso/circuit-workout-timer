import React, { useContext, useReducer } from "react";
import { styled } from "../../styles/stitches.congif";
import { FormattedWorkout } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { Box, Flex } from "../layout";
import useTimer from "../../hooks/useTimer";
import { CounterContext } from "../counterProvider/counterProvider";

type Props = { workoutData: FormattedWorkout };

const ExerciseCounter = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(CounterContext);

  const [state] = useTimer(workoutData);

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

  const WorkoutComplete = () => {
    return (
      <Flex css={{ padding: "$2x" }}>
        <p>Workout Complete!</p>
      </Flex>
    );
  };

  return (
    <Flex
      direction="column"
      css={{ alignItems: "center", backgroundColor: "$gray-05" }}>
      {isTimerDone ? (
        <WorkoutComplete />
      ) : (
        <>
          <p>Time Remaining: {formatTime(state.runningTime)}</p>
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
