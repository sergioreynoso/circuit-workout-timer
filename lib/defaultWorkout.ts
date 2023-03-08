import { Activity } from '@prisma/client';
import { Optional } from 'ts-toolbelt/out/Object/Optional';
import { FormattedActivity } from './formatWorkout';

export const defaultActivities: Omit<FormattedActivity, 'id'>[] = [
  {
    name: 'Jumping Jacks',
    display_seq: 0,
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
    display_seq: 2,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Plank',
    display_seq: 3,
    duration: 30000,
    type: 'WORK',
  },
];

export const newActivity: Omit<FormattedActivity, 'id'>[] = [
  {
    name: 'First Exercise',
    display_seq: 0,
    duration: 30000,
    type: 'WORK',
  },
];
