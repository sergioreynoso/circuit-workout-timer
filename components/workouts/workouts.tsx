import { Workout } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import Button from '../button';
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
    <div className="flex flex-col gap-5">
      <WorkoutListHeader userId={userId} />
      <WorkoutSortableList key={query.dataUpdatedAt} data={query.data} />
      {/* <button className="flex-grow h-16 text-xl font-extrabold leading-7 rounded-2xl bg-amber-500 text-amber-900">
        Create Workout
      </button> */}
      <Button intent="primary">Create Workout</Button>
    </div>
  );
};

export default Workouts;
