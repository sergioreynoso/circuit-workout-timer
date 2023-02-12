import { useSession } from 'next-auth/react';
import { Container } from '../components/layout';
import Preloader from '../components/preloader';
import Workouts from '../components/workouts/workouts';

const Dashboard = () => {
  const { data: session } = useSession();
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
