import { Activity } from '@prisma/client';
import { Optional } from 'ts-toolbelt/out/Object/Optional';

export const defaultWorkout: Optional<Activity, 'id' | 'workoutId'>[] = [
  {
    name: 'Squats',
    display_seq: 1,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Sit-Ups',
    display_seq: 2,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Lunges',
    display_seq: 3,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Jumping Jacks',
    display_seq: 4,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Plank',
    display_seq: 5,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Mountain Climber',
    display_seq: 6,
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
    name: 'Jumping Jacks',
    display_seq: 8,
    duration: 30000,
    type: 'WORK',
  },
  {
    name: 'Burpee',
    display_seq: 9,
    duration: 30000,
    type: 'WORK',
  },
];
