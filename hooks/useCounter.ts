import { useEffect, useRef, useState } from "react";
import { ExerciseWithTimestamp } from "./useWorkout";

export default function useCounter(
  workoutExercises: ExerciseWithTimestamp[],
  remainingTime: number
): [ExerciseWithTimestamp, number, ExerciseWithTimestamp] {
  const exercisesRef = useRef([...workoutExercises]);
  const [currentExercise, setCurrentExercise] = useState(
    exercisesRef.current[0]
  );
  const [currentExerciseRemainingTime, setCurrentExerciseRemainingTime] =
    useState(exercisesRef.current[0]?.duration);

  const [nextExercise, setNextExercise] = useState(exercisesRef.current[1]);

  useEffect(() => {
    exercisesRef.current.forEach((exercise, index) => {
      if (!exercise.timestamp) return;
      if (
        remainingTime < exercise.timestamp.start &&
        remainingTime > exercise.timestamp.end
      ) {
        setCurrentExercise(exercise);
        setCurrentExerciseRemainingTime(exercise.duration);
        setNextExercise(exercisesRef.current[index + 1]);
        exercisesRef.current.shift();
      }
    });
    setCurrentExerciseRemainingTime(
      (currentRemainingTime) => currentRemainingTime - 1000
    );
  }, [remainingTime]);

  return [currentExercise, currentExerciseRemainingTime, nextExercise];
}
