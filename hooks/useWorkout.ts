import { Exercise, Workout } from "@prisma/client";
import { useMemo } from "react";
import { addTimestamp } from "../lib/addTimestamp";
import range from "lodash/range";
import cuid from "cuid";
import { WorkoutWithExercises } from "./useFetchWorkout";

export interface ExerciseWithTimestamp extends Omit<Exercise, "display_seq"> {
  timestamp?: { start: number; end: number };
}

const WARMUP: ExerciseWithTimestamp = {
  id: cuid(),
  exercise_name: "Warm up",
  type: "REST",
  duration: 10000,
  workoutId: "",
};

const SET_REST = (rest: number): ExerciseWithTimestamp => ({
  id: cuid(),
  exercise_name: "Set Rest",
  type: "REST",
  duration: rest,
  workoutId: "",
});

export function useWorkout(
  workoutDetails: WorkoutWithExercises
): [ExerciseWithTimestamp[], number] {
  const exercises = workoutDetails.exercises as ExerciseWithTimestamp[];
  const totalSets = workoutDetails.set_count;
  const setRest = workoutDetails.set_rest;

  return useMemo(() => {
    //Formats workout of sets and exercises
    let workout = range(totalSets).flatMap((_, index) => {
      let arr = [...exercises];
      if (index === 0) arr.unshift(WARMUP);
      if (index < totalSets - 1) arr.push(SET_REST(setRest));
      return arr;
    });

    const workoutTotalTime = workout.reduce(
      (prev, curr) => prev + curr.duration,
      0
    );

    workout = addTimestamp(workout, workoutTotalTime);

    return [workout, workoutTotalTime];
  }, [exercises, totalSets, setRest]);
}
