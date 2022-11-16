import React, { useEffect } from "react";
import WorkoutList from "../components/workoutList";
import { Flex } from "../components/layout";
import WorkoutListHeader, {
  TransformedWorkout,
} from "../components/workoutListHeader/workoutListHeader";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Exercise, Workout } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type DashboardProps = {
  id: string;
  initialData: Workout[];
};

const exercises: Partial<Exercise>[] = [
  {
    exercise_name: "Squats",
    display_seq: 0,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Sit-Ups",
    display_seq: 1,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Lunges",
    display_seq: 2,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Jumping Jacks",
    display_seq: 3,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Plank",
    display_seq: 4,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Mountain Climber",
    display_seq: 5,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Pushups",
    display_seq: 6,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Jumping Jacks",
    display_seq: 7,
    duration: 30000,
    type: "EXERCISE",
  },
  {
    exercise_name: "Burpees",
    display_seq: 8,
    duration: 30000,
    type: "EXERCISE",
  },
];

const Dashboard = ({ id, initialData }: DashboardProps) => {
  const mutation = useMutation((workout: TransformedWorkout) => {
    return axios.post("/api/createWorkout", workout);
  });

  useEffect(() => {
    if (initialData.length === 0) {
      mutation.mutate({
        workout_name: "Full Bodyweight Workout",
        set_count: 3,
        set_rest: 3000,
        userId: id,
        display_seq: 0,
        exerciseList: exercises,
      });
    }
  }, []);

  return (
    <Flex css={{ justifyContent: "center" }}>
      <Flex
        direction="column"
        css={{
          flex: 1,
          gap: "$2x",
          padding: "$2x $lg",
          maxWidth: "600px",
        }}>
        <WorkoutListHeader userId={id} />
        <WorkoutList data={initialData as Workout[]} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const id = session?.user?.id;
  const workouts = await prisma?.workout.findMany({
    where: {
      userId: id as string,
    },
    orderBy: {
      display_seq: "asc",
    },
  });

  return {
    props: {
      id,
      initialData: workouts,
    },
  };
};

export default Dashboard;
