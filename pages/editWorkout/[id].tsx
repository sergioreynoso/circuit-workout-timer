import { Workout } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import EditWorkoutForm from "../../components/editWorkoutForm";
import ExerciseList from "../../components/exerciseList";
import Preloader from "../../components/preloader";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";
import { styled } from "../../styles/stitches.congif";

type EditProps = {
  initialData: WorkoutWithExercises;
};

const Edit = ({ initialData }: EditProps) => {
  const { data } = useFetchWorkout("getWorkout", initialData.id, initialData);

  if ("id" in data) {
    return (
      <Wrapper>
        <Header>
          <Heading1>Edit Workout</Heading1>
          <Link href={`/workout/${data.id}`}>
            <Back>Cancel</Back>
          </Link>
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

const Back = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Edit;
