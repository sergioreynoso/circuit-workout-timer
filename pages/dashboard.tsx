import { useSession } from 'next-auth/react';
import { Container } from '../components/layout';
import Preloader from '../components/preloader';
import WorkoutsList from '../components/workoutsList/workoutsList';
import Header from '../components/header';

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <Preloader label="Loading" />;
  }

  return (
    <>
      <Header />
      <Container>
        <WorkoutsList userId={userId} />
      </Container>
    </>
  );
};

export default Dashboard;
