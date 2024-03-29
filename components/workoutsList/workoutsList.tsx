import useFetchWorkoutList from '../../hooks/reactQueryHooks/useFetchWorkoutList';
import Preloader from '../preloader/preloader';
import WorkoutListHeader from '../workoutListHeader';
import WorkoutSortableList from '../workoutSortableList';

const Workouts = ({ userId }: { userId: string }) => {
  const query = useFetchWorkoutList(userId);

  if (!query.data) return <Preloader label="Loading workouts..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <div className=" mt-8 flex max-w-lg flex-col gap-8  px-4 md:px-0">
      <WorkoutListHeader userId={userId} data={query.data} />
      <WorkoutSortableList key={query.dataUpdatedAt} data={query.data} />
    </div>
  );
};

export default Workouts;
