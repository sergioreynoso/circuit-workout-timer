import React from "react";
import { styled } from "../../styles/stitches.congif";
import Timer from "../../components/timer";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { useRouter } from "next/router";
import Button from "../../components/button";

type WorkoutTimerProps = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: WorkoutTimerProps) => {
  const router = useRouter();

  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/dashboard`);
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/editWorkout/${initialData.id as string}`);
  };

  return (
    <Box>
      <Heading1>{initialData.workout_name}</Heading1>
      <Navigation>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onEdit}>Edit</Button>
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

export default WorkoutTimer;
