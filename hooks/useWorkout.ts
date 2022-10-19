import { Workouts } from "@prisma/client";
import { useMemo } from "react";
import { getTimestamp } from "../lib/getTimestamp";
import { Exercise } from "../pages/workout/[id]";

export type Workout = Exercise & {
  timestamp: { start: number; end: number };
};

const warmUp: Exercise = {
  id: "",
  type: "REST",
  exercise_name: "Warm up",
  duration: 3000,
};

export function useWorkout(
  workout: Workouts,
  exercises: Exercise[] | undefined
): [Workout[], number] {
  const totalSets = workout.set_count;
  const setRest = workout.set_rest;

  let workoutList = useMemo(() => {
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
          });
      }
    }

    return array;
  }, [exercises, totalSets, setRest]);

  const workoutTotalTime = useMemo((): number => {
    return workoutList.reduce((prev, curr) => prev + curr.duration, 0);
  }, [workout]);

  workoutList = useMemo(
    () => getTimestamp(workoutList, workoutTotalTime),
    [workoutList, workoutTotalTime]
  );

  return [workoutList as Workout[], workoutTotalTime];
}
