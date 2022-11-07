import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/button";
import EditWorkoutForm from "../../components/editWorkoutForm";
import ExerciseList from "../../components/exerciseList";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";
import { styled } from "../../styles/stitches.congif";

type EditProps = {
  initialData: WorkoutWithExercises;
};

const Edit = ({ initialData }: EditProps) => {
  const router = useRouter();
  const { data } = useFetchWorkout("getWorkout", initialData.id, initialData);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/workout/${initialData.id}`);
  };

  if ("id" in data && "exercises" in data) {
    return (
      <Wrapper>
        <Header>
          <Heading1>Edit Workout</Heading1>
          <Button onClick={onCancel}>Cancel</Button>
        </Header>
        <EditWorkoutForm workoutData={data}>
          <ExerciseList workoutId={data.id} data={data.exercises} />
        </EditWorkoutForm>
      </Wrapper>
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

const NextLink = styled(Link, {
  color: "$primary-09",
  textDecoration: "none",
});

export default Edit;
