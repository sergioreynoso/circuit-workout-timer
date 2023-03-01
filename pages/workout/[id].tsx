import { useRouter } from 'next/router';
import { Container } from '../../components/layout';
import Preloader from '../../components/preloader';
import Timer from '../../components/timer';
import TimerProvider from '../../components/timerContext';
import TimerHeader from '../../components/timerHeader';
import useFetchWorkout from '../../hooks/useFetchWorkout';

const WorkoutTimer = () => {
  const router = useRouter();
  const workoutId = router.query.id as string;

  const query = useFetchWorkout(workoutId);

  if (!query.data) return <Preloader label="Loading workout..." />;
  if (query.error) return <Preloader label="Error loading page" />;

  return (
    <TimerProvider>
      <Container>
        <TimerHeader data={query.data} />
        <Timer workoutData={query.data} />
      </Container>
    </TimerProvider>
  );
};

export default WorkoutTimer;
