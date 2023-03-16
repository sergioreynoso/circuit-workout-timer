import { FormattedActivity } from './formatWorkout';

export const newActivity: Omit<FormattedActivity, 'id'>[] = one();
// export const newActivity: Omit<FormattedActivity, 'id'>[] = kettleBell();

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

function kettleBell(): Omit<FormattedActivity, 'id'>[] {
  return [
    {
      name: 'Slingshot clockwise',
      display_seq: 0,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Single Arm Dead-Lift Left',
      display_seq: 1,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Slingshot counter-clockwise',
      display_seq: 2,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Single Arm Dead-Lift Right',
      display_seq: 3,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Slingshot clockwise',
      display_seq: 4,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Halo Alternate',
      display_seq: 5,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Slingshot counter-clockwise',
      display_seq: 6,
      duration: 30000,
      type: 'WORK',
    },
    {
      name: 'Goblet Squats',
      display_seq: 7,
      duration: 30000,
      type: 'WORK',
    },
  ];
}

function one(): Omit<FormattedActivity, 'id'>[] {
  return [
    {
      name: 'First Exercise',
      display_seq: 0,
      duration: 30000,
      type: 'WORK',
    },
  ];
}
