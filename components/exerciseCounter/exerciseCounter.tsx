import { Workout } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import { styled } from "../../styles/stitches.congif";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";

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
      <Box>
        <p>Workout Complete!</p>
      </Box>
    );
  }

  return (
    <Box>
      <Heading2>{formatTime(exerciseDuration.current)}</Heading2>
      <br />
      <p>{exercise.current.exercise_name}</p>
      {exercises.current[nextExerciseIndex.current] && (
        <Box
          css={{
            marginTop: "$3x",
          }}>
          <h4>Up next:</h4>
          <p>{exercises.current[nextExerciseIndex.current]?.exercise_name}</p>
        </Box>
      )}
    </Box>
  );
};

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$sm",
});
const Heading2 = styled("h2", {
  fontSize: "$5x",
});

export default ExerciseCounter;
