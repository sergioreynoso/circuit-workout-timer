import { Activity } from '@prisma/client';
import range from 'lodash/range';
import { useMemo } from 'react';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { addTimestamp } from '../lib/addTimestamp';
import { WorkoutWithActivities } from '../types/workout';

export type FormattedWorkout = {
  id: string;
  activities: FormattedActivity[];
  duration: number;
  totalSets: number;
};

type TimeStamp = { timestamp?: { start: number; end: number } };

export type FormattedActivity = Optional<Activity, 'id' | 'display_seq' | 'workoutId'> & TimeStamp;

const WARMUP: FormattedActivity = {
  name: 'Warm up',
  type: 'WORK',
  duration: 5000,
};

const SET_REST = (rest: number): FormattedActivity => ({
  name: 'Set Rest',
  type: 'REST',
  duration: rest,
});

export function useFormatWorkout(workout: WorkoutWithActivities) {
  return useMemo(() => {
    const id = workout.id;
    const totalSets = workout.set_count;
    const setRest = workout.set_rest;

    //Formats workout with warmup and activities
    let formattedWorkout = range(totalSets).flatMap((_, index) => {
      let arr: FormattedActivity[] = [...workout.activities];
      if (index === 0) arr.unshift(WARMUP);
      if (index < totalSets - 1) arr.push(SET_REST(setRest));
      return arr;
    });

    const duration = formattedWorkout.reduce((prev, curr) => prev + curr.duration, 0);
    const activities = addTimestamp(formattedWorkout, duration);

    return { id, activities, duration, totalSets };
  }, [workout]);
}
