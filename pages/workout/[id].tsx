import React from "react";
import { styled } from "../../styles/stitches.congif";
import Timer from "../../components/timer";
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { WorkoutWithExercises } from "../../hooks/useFetchWorkout";
import { Flex } from "../../components/layout";

type WorkoutTimerProps = {
  initialData: WorkoutWithExercises;
};

const WorkoutTimer = ({ initialData }: WorkoutTimerProps) => {
  return (
    <Flex
      direction="column"
      css={{
        justifyContent: "space-around",
        alignItems: "center",
        padding: "24px",
      }}>
      <Heading1>{initialData.workout_name}</Heading1>

      <Flex css={{ flex: "1" }}>
        <Timer workoutDetails={initialData} exercises={initialData.exercises} />
      </Flex>
    </Flex>
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

const Heading1 = styled("h1", {
  fontSize: "$lg",
  lineHeight: "$150",
  textAlign: "center",
  marginBottom: "$lg",
});

export default WorkoutTimer;
