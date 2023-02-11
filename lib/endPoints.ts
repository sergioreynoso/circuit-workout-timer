const ver = 'v1';

export const endPoints = {
  workouts: `/api/${ver}/workouts`,
  workout: `/api/${ver}/workout`,
  workoutSort: `/api/${ver}/updateWorkoutOrder`,
  activities: `/api/${ver}/activities`,
  activity: `/api/${ver}/activity`,
  activitySort: `/api/${ver}/updateActivityOrder`,
};

export type EndPoints = keyof typeof endPoints;
