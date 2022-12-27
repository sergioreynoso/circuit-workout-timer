import { GetServerSideProps } from "next";
import CounterHeader from "../../components/counterHeader";
import TimerProvider from "../../components/timerContext";
import ExerciseCounter from "../../components/exerciseCounter";
import { Box } from "../../components/layout";
import TimerControl from "../../components/timerControl/timerControl";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { useWorkout } from "../../hooks/useWorkout";
import { prisma } from "../../lib/prisma";

type Props = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: Props) => {
  const formattedWorkout = useWorkout(initialData);

  return (
    <TimerProvider>
      <Box
        css={{
          padding: "$xl",
          maxWidth: "$bp-md",
          margin: "auto",
        }}>
        <CounterHeader id={initialData.id}>
          {initialData.workout_name}
        </CounterHeader>
        <ExerciseCounter workoutData={formattedWorkout} />
        <TimerControl />
      </Box>
    </TimerProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const workout = await prisma?.workout.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      exercises: {
        orderBy: {
          display_seq: "asc",
        },
      },
    },
  });

  return {
    props: { initialData: workout },
  };
};

export default WorkoutTimer;
