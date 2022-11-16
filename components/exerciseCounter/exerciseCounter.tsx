import React, { useEffect, useRef } from "react";
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
  const exercises = useRef([...workoutExercises]);
  const exercise = useRef(workoutExercises[0]);
  const exerciseDuration = useRef<number>(0);
  const nextExerciseIndex = useRef<number>(1);

  exercises.current.forEach((item, index) => {
    if (item.timestamp) {
      if (
        remainingTime < item.timestamp.start &&
        remainingTime > item.timestamp.end
      ) {
        exercise.current = item;
        nextExerciseIndex.current = index;
        /**
         * exerciseDuration gets updated with new exercise duration minus one second
         * so that exerciseDuration count is in sync with remainingTime count.
         */
        exerciseDuration.current = item.duration - 1000;
        exercises.current.shift();
      }
    }
  });

  useEffect(() => {
    if (exerciseDuration.current) exerciseDuration.current -= 1000;
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
      css={{ flexDirection: "column", alignItems: "center", gap: "$3x" }}>
      <p>Time Remaining: {formatTime(remainingTime)}</p>
      <TimerCounter>{formatTime(exerciseDuration.current)}</TimerCounter>
      <SetCounter exercises={workoutExercises} remainingTime={remainingTime} />
      <CurrentExercise>{exercise.current.exercise_name}</CurrentExercise>
      {exercises.current[nextExerciseIndex.current] && (
        <Flex direction="column" css={{ alignItems: "center", gap: "$sm" }}>
          <h4>Up next:</h4>
          <NextExercise>
            {exercises.current[nextExerciseIndex.current]?.exercise_name}
          </NextExercise>
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
