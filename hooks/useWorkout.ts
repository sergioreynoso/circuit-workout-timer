import { Exercise, Workout } from "@prisma/client";
import { useMemo } from "react";
import { addTimestamp } from "../lib/addTimestamp";

export interface ExerciseWithTimestamp extends Omit<Exercise, "display_seq"> {
  timestamp?: { start: number; end: number };
}

const warmUp: ExerciseWithTimestamp = {
  id: "",
  type: "REST",
  exercise_name: "Warm up",
  duration: 10000,
  workoutId: "",
};

export function useWorkout(
  workout: Workout,
  exercises: ExerciseWithTimestamp[]
): [ExerciseWithTimestamp[], number] {
  const totalSets = workout.set_count;
  const setRest = workout.set_rest;

  let workoutExercises = useMemo(() => {
    let array = [warmUp];
    if (exercises) {
      for (let i = 0; i < totalSets; i++) {
        array.push(...exercises);
        //Add set-rest after end of set
        if (i < totalSets - 1)
          array.push({
            type: "REST",
            id: "",
            exercise_name: "Set Rest",
            duration: setRest,
            workoutId: "",
          });
      }
    }

    return array;
  }, [exercises, totalSets, setRest]);

  const workoutTotalTime = useMemo(() => {
    return workoutExercises.reduce((prev, curr) => prev + curr.duration, 0);
  }, [workout]);

  workoutExercises = useMemo(() => {
    return addTimestamp(workoutExercises, workoutTotalTime);
  }, [workoutExercises, workoutTotalTime]);

  return [workoutExercises, workoutTotalTime];
}
