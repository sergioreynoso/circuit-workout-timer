import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { Container } from '../components/layout';
import Preloader from '../components/preloader';
import WorkoutListHeader from '../components/workoutListHeader';
import Workouts from '../components/workouts/workouts';
import WorkoutSortableList from '../components/workoutSortableList';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <Preloader label="Loading" />;
  }

  return (
    <Container>
      <Workouts userId={userId} />
    </Container>
  );
};

export default Dashboard;
