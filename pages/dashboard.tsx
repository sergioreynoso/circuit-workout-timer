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

// const exercises: Partial<Exercise>[] = [
//   {
//     exercise_name: "Squats",
//     display_seq: 0,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Sit-Ups",
//     display_seq: 1,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Lunges",
//     display_seq: 2,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Jumping Jacks",
//     display_seq: 3,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Plank",
//     display_seq: 4,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Mountain Climber",
//     display_seq: 5,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Pushups",
//     display_seq: 6,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Jumping Jacks",
//     display_seq: 7,
//     duration: 30000,
//     type: "EXERCISE",
//   },
//   {
//     exercise_name: "Burpee",
//     display_seq: 8,
//     duration: 30000,
//     type: "EXERCISE",
//   },
// ];
