import { Workout } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import Preloader from '../preloader/preloader';
import WorkoutListHeader from '../workoutListHeader';
import WorkoutSortableList from '../workoutSortableList';

const Workouts = ({ userId }: { userId: string }) => {
  const query = useQuery({
    queryKey: ['workouts'],
    queryFn: () => fetcher<Workout[]>(userId, 'workouts'),
  });

  if (query.status !== 'success' && !query.data) return <Preloader label="Loading workouts..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <>
      <WorkoutListHeader userId={userId} />
      <WorkoutSortableList key={query.dataUpdatedAt} data={query.data} />
    </>
  );
};

export default Workouts;
