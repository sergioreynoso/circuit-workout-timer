import Preloader from '../../components/preloader';
import Timer from '../../components/timer';
import TimerHeader from '../../components/timerHeader';
import useFetchWorkout from '../../hooks/useFetchWorkout';

type Props = {
  workoutId: string;
};

const Workout = ({ workoutId }: Props) => {
  const query = useFetchWorkout(workoutId);

  if (!query.data) return <Preloader label="Loading workout..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <>
      <TimerHeader data={query.data} />
      <Timer workoutData={query.data} />
    </>
  );
};

export default Workout;
