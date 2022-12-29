import { GetServerSideProps } from "next";
import WorkoutForm from "../../components/workoutForm";
import ActivityList from "../../components/activityList";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";
import { prisma } from "../../lib/prisma";
import { styled } from "../../styles/stitches.congif";
import cuid from "cuid";
import Button from "../../components/button";
import useWorkoutMutation from "../../hooks/useWorkoutMutation";
import { useRouter } from "next/router";
import { useId } from "react";

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
      set_rest: Number(rest * 1000),
    });
  };

  if ("id" in data && "exercises" in data) {
    return (
      <Wrapper>
        <Header>
          <Heading1>Edit Workout</Heading1>
        </Header>
        <WorkoutForm
          name={initialData.workout_name}
          set={initialData.set_count}
          rest={initialData.set_rest}
          onSubmitCallback={mutateWorkout}
          id={formId}
        />
        <ActivityList
          key={cuid()}
          workoutId={data.id}
          activitiesData={[...data.exercises]}
        />
        <Footer>
          <Button
            colors="primary"
            type="submit"
            form={formId}
            css={{ flex: 1, maxWidth: "200px" }}>
            Done
          </Button>
        </Footer>
      </Wrapper>
    );
  }
};

const Footer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80px",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    bottom: "0",
  },
});

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

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$lg",
  padding: "$2x",
});

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

export default Edit;
