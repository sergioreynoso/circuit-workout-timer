import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from "../../styles/stitches.congif";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { Flex } from "../layout";
import SetCounter from "../setCounter";

interface ExerciseProps {
  workoutExercises: ExerciseWithTimestamp[];
  remainingTime: number;
}

const ExerciseCounter = ({
  workoutExercises,
  remainingTime,
}: ExerciseProps) => {
  const [exercises, setExercises] = useState(() => [...workoutExercises]);
  const [currentExercise, setCurrentExercise] = useState(() => exercises[0]);
  const [currentExerciseRemainingTime, setCurrentExerciseRemainingTime] =
    useState(0);
  const [nextExercise, setNextExercise] = useState(() => exercises[1]);

  exercises.forEach((exercise, index) => {
    if (!exercise.timestamp) return;
    if (
      remainingTime < exercise.timestamp.start &&
      remainingTime > exercise.timestamp.end
    ) {
      setCurrentExercise(exercise);
      setCurrentExerciseRemainingTime(exercise.duration);

      setNextExercise(exercises[index + 1]);

      setExercises((exercises) =>
        exercises.filter((item) => item.id !== exercise.id)
      );
    }
  });

  useEffect(() => {
    currentExerciseRemainingTime &&
      setCurrentExerciseRemainingTime((prev) => prev - 1000);
  }, [remainingTime]);

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
      <p>Time Remaining: {formatTime(remainingTime)}</p>
      <TimerCounter>{formatTime(currentExerciseRemainingTime)}</TimerCounter>
      <SetCounter exercises={workoutExercises} remainingTime={remainingTime} />
      <CurrentExercise>{currentExercise.exercise_name}</CurrentExercise>
      {nextExercise && (
        <Flex direction="column" css={{ alignItems: "center", gap: "$sm" }}>
          <h4>Up next:</h4>
          <NextExercise>{nextExercise.exercise_name}</NextExercise>
        </Flex>
      )}
    </Flex>
  );
};

const TimerCounter = styled("h2", {
  fontSize: "$3x",
  lineHeight: "$150",
});

const CurrentExercise = styled("p", {
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
