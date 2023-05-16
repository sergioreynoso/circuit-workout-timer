import { Workout } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useWorkoutMutation from '../../hooks/reactQueryHooks/useWorkoutMutation';
import { newActivity } from '../../lib/defaultActivities';
import { FormattedActivity } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import Button from '../button/button';

const MAX_WORKOUTS = 5 as const;

type Props = {
  userId: string;
  data: Workout[];
};

const WorkoutListHeader = ({ userId, data }: Props) => {
  const router = useRouter();
  const { createWorkout } = useWorkoutMutation('');
  const queryClient = useQueryClient();

  const onClickHandler = () => {
    const workouts = queryClient.getQueryData<WorkoutWithActivities[]>(['workouts']);
    if (workouts)
      createWorkout.mutate(
        {
          name: 'Untitled Workout',
          set_count: 1,
          set_rest: 10000,
          duration: 0,
          userId: userId,
          display_seq: workouts.length + 1,
          activities: newActivity as FormattedActivity[],
        },
        {
          onSuccess: ({ data: newData }) => {
            router.push(`/editWorkout/${newData.id}`);
          },
        }
      );
  };

  return (
    <div className="flex items-center justify-between">
      {createWorkout.isLoading && <Preloader />}
      <div className="flex flex-grow flex-col">
        <h2 className="text-base font-bold leading-7 text-gray-100">Workouts</h2>
        <p className="text-base font-normal leading-6 text-gray-400">Create up to 5 workouts</p>
      </div>
      <Button intent="primary" onClick={onClickHandler} disabled={data.length >= MAX_WORKOUTS}>
        Create Workout
      </Button>
    </div>
  );
};

function Preloader() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900/80">
      <div className="flex h-40 w-52 items-center justify-center rounded-lg bg-gray-800 font-semibold text-gray-300 shadow-md">
        Creating workout...
      </div>
    </div>
  );
}

export default WorkoutListHeader;
