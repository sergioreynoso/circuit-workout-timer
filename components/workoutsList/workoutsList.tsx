import { Workout } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useWorkoutMutation from '../../hooks/reactQueryHooks/useWorkoutMutation';
import { defaultWorkout } from '../../lib/defaultWorkout';
import fetcher from '../../lib/fetcher';
import Preloader from '../preloader/preloader';
import WorkoutListHeader from '../workoutListHeader';
import WorkoutSortableList from '../workoutSortableList';

const Workouts = ({ userId }: { userId: string }) => {
  const { createWorkout } = useWorkoutMutation('');

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<Workout[]>(userId, 'workouts'),
    onSuccess: data => {
      if (data.length === 0) {
        createWorkout.mutate(defaultWorkout(userId), {
          onSuccess: () => {
            queryClient.invalidateQueries(['workouts']);
          },
        });
      }
    },
  });

  if (query.status !== 'success' && !query.data) return <Preloader label="Loading workouts..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <div className=" mt-8 flex max-w-lg flex-col gap-8  px-4 md:px-0">
      <WorkoutListHeader userId={userId} data={query.data} />
      <WorkoutSortableList key={query.dataUpdatedAt} data={query.data} />
    </div>
  );
};

export default Workouts;
