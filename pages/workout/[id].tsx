import { GetServerSideProps } from "next";
import { Container } from "../../components/layout";
import Timer from "../../components/timer";
import TimerProvider from "../../components/timerContext";
import TimerControl from "../../components/timerControl/timerControl";
import TimerHeader from "../../components/timerHeader";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { useFormatWorkout } from "../../hooks/useFormatWorkout";
import { prisma } from "../../lib/prisma";

type Props = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: Props) => {
  const formattedWorkout = useFormatWorkout(initialData);

  return (
    <TimerProvider>
      <Container>
        <TimerHeader id={initialData.id}>{initialData.workout_name}</TimerHeader>
        <Timer workoutData={formattedWorkout} />
        <TimerControl />
      </Container>
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
