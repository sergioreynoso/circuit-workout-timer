import cuid from "cuid";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useId } from "react";
import ActivityList from "../../components/activityList";
import Button from "../../components/button";
import { Box, Container, Flex, FooterContainer } from "../../components/layout";
import WorkoutForm from "../../components/workoutForm";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import { prisma } from "../../lib/prisma";

type Props = {
  initialData: WorkoutWithExercises;
};

const Edit = ({ initialData }: Props) => {
  const formId = useId();
  const router = useRouter();

  const { data } = useFetchWorkout(
    "getWorkout",
    initialData.id,
    "workout",
    initialData
  );

  const mutation = useWorkoutMutation("updateWorkout", "workout", () => {
    router.push(`/workout/${initialData.id}`);
  });

  const mutateWorkout = (name: string, set: number, rest: number) => {
    mutation.mutate({
      id: initialData.id,
      workout_name: name,
      set_count: Number(set),
      set_rest: Number(rest), //Number(rest * 1000),
    });
  };

  if ("id" in data && "exercises" in data) {
    return (
      <Container>
        <Box as="h1" css={{ paddingBlock: "$2x" }}>
          Edit Workout
        </Box>
        <WorkoutForm
          name={initialData.workout_name}
          setCount={initialData.set_count}
          setRest={initialData.set_rest}
          onSubmitCallback={mutateWorkout}
          id={formId}
        />
        <ActivityList
          key={cuid()}
          workoutId={data.id}
          activitiesData={[...data.exercises]}
        />
        <FooterContainer>
          <Button
            colors="primary"
            type="submit"
            form={formId}
            css={{ flex: 1, maxWidth: "200px" }}>
            Done
          </Button>
        </FooterContainer>
      </Container>
    );
  }
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

export default Edit;
