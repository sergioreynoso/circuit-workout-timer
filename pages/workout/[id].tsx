import { useRouter } from 'next/router';
import { Container } from '../../components/layout';
import Preloader from '../../components/preloader/preloader';
import TimerProvider from '../../components/timerContext';
import Workout from '../../components/workout/workout';

const WorkoutTimer = () => {
  const {
    isReady,
    query: { id },
  } = useRouter();

  if (!isReady) {
    return <Preloader label="Loading" />;
  }

  return (
    <TimerProvider>
      <Container>
        <Workout workoutId={id as string} />
      </Container>
    </TimerProvider>
  );
};

export default WorkoutTimer;
