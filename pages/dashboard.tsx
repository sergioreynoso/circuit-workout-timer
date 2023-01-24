import { useSession } from "next-auth/react";
import { Container } from "../components/layout";
import Preloader from "../components/preloader";
import WorkoutList from "../components/workoutList";
import WorkoutListHeader from "../components/workoutListHeader/workoutListHeader";

const Dashboard = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  if (!userId) {
    return <Preloader label="Loading" />;
  }

  return (
    <Container>
      <WorkoutListHeader userId={userId} />
      <WorkoutList userId={userId} />
    </Container>
  );
};

export default Dashboard;

// if (workouts.length <= 0) {
//   const workout = await prisma?.workout.create({
//     data: {
//       workout_name: "Default workout",
//       set_count: 3,
//       set_rest: 3000,
//       userId: id,
//       display_seq: 0,
//       exercises: {
//         create: exercises,
//       },
//     },
//     include: {
//       exercises: true,
//     },
//   });
// }

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
