const ver = 'v1';

export const endPoints = {
  workouts: `/api/${ver}/workouts`,
  workout: `/api/${ver}/workout`,
  activities: `/api/${ver}/activities`,
  activity: `/api/${ver}/activity`,
};

export type EndPoints = keyof typeof endPoints;
