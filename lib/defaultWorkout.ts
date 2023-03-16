import { defaultActivities } from './defaultActivities';
import { FormattedActivity } from './formatWorkout';

export const defaultWorkout = (userId: string) => ({
  name: 'Light Workout',
  set_count: 1,
  set_rest: 10000,
  duration: 125000,
  userId: userId,
  display_seq: 0,
  activities: defaultActivities as FormattedActivity[],
});
