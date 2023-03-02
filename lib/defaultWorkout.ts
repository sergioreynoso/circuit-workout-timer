import { Activity } from '@prisma/client';
import { Optional } from 'ts-toolbelt/out/Object/Optional';

export const defaultActivities: Optional<Activity, 'id' | 'workoutId'>[] = [
  {
    name: 'Jumping Jacks',
    display_seq: 4,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Squats',
    display_seq: 1,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Pushups',
    display_seq: 7,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Plank',
    display_seq: 5,
    duration: 30000,
    type: 'WORK',
  },
];

export const newActivity: Optional<Activity, 'id' | 'workoutId'>[] = [
  {
    name: 'First Exercise',
    display_seq: 4,
    duration: 30000,
    type: 'WORK',
  },
];
