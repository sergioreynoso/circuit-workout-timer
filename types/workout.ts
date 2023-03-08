import { Prisma } from '@prisma/client';
import { Workout } from '@prisma/client';
import { FormattedActivity } from '../lib/formatWorkout';

// export type WorkoutWithActivities = Prisma.WorkoutGetPayload<{ include: { activities: true } }>;
export interface WorkoutWithActivities extends Workout {
  activities: FormattedActivity[];
}
