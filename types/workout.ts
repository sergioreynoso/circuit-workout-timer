import { Prisma } from '@prisma/client';

export type WorkoutWithActivities = Prisma.WorkoutGetPayload<{ include: { activities: true } }>;
