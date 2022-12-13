import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "../../styles/stitches.congif";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { Flex } from "../layout";
import SetCounter from "../setCounter";
import useCounter from "../../hooks/useCounter";

interface Props {
  workoutExercises: ExerciseWithTimestamp[];
  remainingTime: number;
}

const ExerciseCounter = ({ workoutExercises, remainingTime }: Props) => {
  const [exercise, exerciseRemainingTime, nextExercise] = useCounter(
    workoutExercises,
    remainingTime
  );

  const formattedExerciseRemainingTime = useMemo(
    () => formatTime(exerciseRemainingTime),
    [exerciseRemainingTime]
  );

  const formattedRemainingTime = useMemo(
    () => formatTime(remainingTime),
    [remainingTime]
  );

  if (remainingTime <= 0) {
    return (
      <Flex>
        <p>Workout Complete!</p>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      css={{ flexDirection: "column", alignItems: "center", gap: "$lg" }}>
      <p>Time Remaining: {formattedRemainingTime}</p>
      <ExerciseRemainingTime>
        {formattedExerciseRemainingTime}
      </ExerciseRemainingTime>
      <SetCounter exercises={workoutExercises} remainingTime={remainingTime} />
      <Exercise>{exercise.exercise_name}</Exercise>
      {nextExercise && (
        <Flex direction="column" css={{ alignItems: "center", gap: "$sm" }}>
          <h4>Up next:</h4>
          <NextExercise>{nextExercise.exercise_name}</NextExercise>
        </Flex>
      )}
    </Flex>
  );
};

const ExerciseRemainingTime = styled("h2", {
  fontSize: "$3x",
  lineHeight: "$150",
});

const Exercise = styled("p", {
  fontSize: "$3x",
  fontWeight: "$700",
  lineHeight: "$150",
  color: "$primary-09",
});

const NextExercise = styled("p", {
  fontSize: "$xx",
  fontWeight: "$700",
  lineHeight: "$150",
});

export default ExerciseCounter;
