import { useSession } from 'next-auth/react';
import { Container } from '../components/layout';
import Preloader from '../components/preloader';
import Workouts from '../components/workouts/workouts';
import Header from '../components/header';

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <Preloader label="Loading" />;
  }

  return (
    <div className="px-04 mx-auto flex max-w-lg flex-col gap-8 py-0">
      <Header />
      <Workouts userId={userId} />
    </div>
  );
};

export default Dashboard;
