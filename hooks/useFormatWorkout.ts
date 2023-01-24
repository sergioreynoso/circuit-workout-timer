import { Exercise } from "@prisma/client";
import cuid from "cuid";
import range from "lodash/range";
import { useMemo } from "react";
import { addTimestamp } from "../lib/addTimestamp";
import { WorkoutWithExercises } from "../lib/types";

export interface Activity extends Omit<Exercise, "display_seq"> {
  timestamp?: { start: number; end: number };
}

export type FormattedWorkout = {
  id: string;
  formattedWorkout: Activity[];
  duration: number;
  totalSets: number;
};

const WARMUP: Activity = {
  id: cuid(),
  exercise_name: "Warm up",
  type: "WARMUP",
  duration: 5000,
  workoutId: "",
};

const SET_REST = (rest: number): Activity => ({
  id: cuid(),
  exercise_name: "Set Rest",
  type: "SET_REST",
  duration: rest,
  workoutId: "",
});

export function useFormatWorkout(workoutDetails: WorkoutWithExercises) {
  return useMemo((): FormattedWorkout => {
    const id = workoutDetails.id;
    const exercises = workoutDetails.exercises as Activity[];
    const totalSets = workoutDetails.set_count;
    const setRest = workoutDetails.set_rest;

    //Formats workout of sets and exercises
    let workout = range(totalSets).flatMap((_, index) => {
      let arr = [...exercises];
      if (index === 0) arr.unshift(WARMUP);
      if (index < totalSets - 1) arr.push(SET_REST(setRest));
      return arr;
    });

    const duration = workout.reduce((prev, curr) => prev + curr.duration, 0);

    const formattedWorkout = addTimestamp(workout, duration);

    return { id, formattedWorkout, duration, totalSets };
  }, [workoutDetails]);
}
