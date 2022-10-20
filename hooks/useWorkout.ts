import { Exercise as ExerciseDb, Workout } from "@prisma/client";

import { useMemo } from "react";
import { addTimestamp } from "../lib/addTimestamp";

export interface Exercise extends ExerciseDb {
  timestamp?: { start: number; end: number };
}

const warmUp: Exercise = {
  id: "",
  type: "REST",
  exercise_name: "Warm up",
  duration: 10000,
  workoutId: "",
};

export function useWorkout(
  workout: Workout,
  exercises: Exercise[] | undefined
): [Exercise[], number] {
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

  const workoutTotalTime = useMemo((): number => {
    return workoutExercises.reduce((prev, curr) => prev + curr.duration, 0);
  }, [workout]);

  workoutExercises = useMemo(
    () => addTimestamp(workoutExercises, workoutTotalTime),
    [workoutExercises, workoutTotalTime]
  );

  return [workoutExercises as Exercise[], workoutTotalTime];
}
