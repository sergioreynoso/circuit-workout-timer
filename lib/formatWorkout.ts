import { Activity } from '@prisma/client';
import range from 'lodash/range';
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

export type FormattedActivity = Optional<Activity, 'display_seq' | 'workoutId'> & TimeStamp;

const WARMUP: Omit<FormattedActivity, 'id'> = {
  name: 'Warm up',
  type: 'WORK',
  duration: 5000,
};

const SET_REST = (rest: number): Omit<FormattedActivity, 'id'> => ({
  name: 'Set Rest',
  type: 'REST',
  duration: rest,
});

export function formatWorkout(workout: WorkoutWithActivities) {
  const id = workout.id;
  const totalSets = workout.set_count;
  const setRest = workout.set_rest;

  //Formats workout with warmup and activities
  let formattedWorkout = range(totalSets).flatMap((_, index) => {
    let arr: Omit<FormattedActivity, 'id'>[] = [...workout.activities];
    if (index === 0) arr.unshift(WARMUP);
    if (index < totalSets - 1) arr.push(SET_REST(setRest));
    return arr;
  });

  const duration = formattedWorkout.reduce((prev, curr) => prev + curr.duration, 0);
  const activities = addTimestamp(formattedWorkout as FormattedActivity[], duration);

  return { id, activities, duration, totalSets };
}
