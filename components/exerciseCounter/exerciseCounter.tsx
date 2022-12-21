import React, { useContext } from "react";
import { styled } from "../../styles/stitches.congif";
import { FormattedWorkout } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { Box, Flex } from "../layout";
import useTimer from "../../hooks/useTimer";
import { CounterContext } from "../counterProvider/counterProvider";
import ProgressBar from "../progressBar";

type Props = { workoutData: FormattedWorkout };

const ExerciseCounter = ({ workoutData }: Props) => {
  const { isTimerDone } = useContext(CounterContext);

  const [state] = useTimer(workoutData);

  const NextExercise = () => {
    return (
      state.nextExercise && (
        <Flex
          direction="column"
          css={{ alignItems: "center", gap: "$sm", padding: "$sm" }}>
          <h4>Next</h4>
          <NextExerciseName>
            {state.nextExercise.exercise_name}
          </NextExerciseName>
        </Flex>
      )
    );
  };

  const WorkoutComplete = () => {
    return (
      <Flex css={{ justifyContent: "center", padding: "$sm" }}>
        <p>Complete!</p>
      </Flex>
    );
  };

  return (
    <Box
      css={{
        alignItems: "center",
        textAlign: "center",
      }}>
      {isTimerDone ? (
        <WorkoutComplete />
      ) : (
        <>
          <RunningTime>
            Time Remaining: {formatTime(state.runningTime)}
          </RunningTime>
          <Sets>
            {state.setCount} / {workoutData.totalSets}
          </Sets>
          <ExerciseRemainingTime>
            {formatTime(state.runningExerciseTime)}
          </ExerciseRemainingTime>
          <Exercise>{state.runningExercise.exercise_name}</Exercise>
          <ProgressBar
            runningExercise={state.runningExercise}
            runningExerciseTime={state.runningExerciseTime}
          />
          <NextExercise />
        </>
      )}
    </Box>
  );
};

const RunningTime = styled("h2", {
  lineHeight: "$100",
  padding: "$sm",
});

const ExerciseRemainingTime = styled("h2", {
  fontSize: "$3x",
  lineHeight: "$150",
  padding: "$sm",
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
