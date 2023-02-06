import { Activity, Workout } from '@prisma/client';
import range from 'lodash/range';
import { useMemo } from 'react';
import { addTimestamp } from '../lib/addTimestamp';
import { WorkoutWithActivities } from '../types/workout';

// export type FormattedWorkout = {
//   id: string;
//   activities: FormattedActivity[];
//   duration: number;
//   totalSets: number;
// };

type TimeStamp = { timestamp?: { start: number; end: number } };

export type FormattedActivity = Partial<Activity> &
  Pick<Activity, 'activity_name' | 'duration' | 'type'> &
  Partial<TimeStamp>;

const WARMUP: FormattedActivity = {
  activity_name: 'Warm up',
  type: 'WORK',
  duration: 5000,
};

const SET_REST = (rest: number): FormattedActivity => ({
  activity_name: 'Set Rest',
  type: 'REST',
  duration: rest,
});

export function useFormatWorkout(data: WorkoutWithActivities) {
  return useMemo(() => {
    const id = data.id;
    const activities = data.activities;
    const totalSets = data.set_count;
    const setRest = data.set_rest;

    //Formats workout with warmup and activities
    let workout = range(totalSets).flatMap((_, index) => {
      let arr: FormattedActivity[] = [...activities];
      if (index === 0) arr.unshift(WARMUP);
      if (index < totalSets - 1) arr.push(SET_REST(setRest));
      return arr;
    });

    const duration = workout.reduce((prev, curr) => prev + curr.duration, 0);
    const formattedWorkout = addTimestamp(workout, duration);

    return { id, formattedWorkout, duration, totalSets };
  }, [data]);
}
