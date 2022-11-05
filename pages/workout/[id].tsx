import React from "react";
import { styled } from "../../styles/stitches.congif";
import Timer from "../../components/timer";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Exercise, Workout } from "@prisma/client";

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

const WorkoutTimer = ({
  initialData,
}: {
  initialData: WorkoutWithExercises;
}) => {
  return (
    <Box>
      <Heading1>{initialData.workout_name}</Heading1>
      <Navigation>
        <Link href="/dashboard">
          <LinkTag>Cancel</LinkTag>
        </Link>
        <Link href={`/editWorkout/${initialData.id as string}`}>
          <LinkTag>Edit</LinkTag>
        </Link>
      </Navigation>
      <Box>
        <Timer workout={initialData} exercises={initialData.exercises} />
      </Box>
    </Box>
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

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

const Navigation = styled("nav", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$3x",
});

const LinkTag = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default WorkoutTimer;
