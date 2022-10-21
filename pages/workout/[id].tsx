import React from "react";
import { Exercise as ExerciseDb, Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";
import axios from "axios";

export type Exercise = Omit<ExerciseDb, "workoutsId">;

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchWorkout = (id: string | undefined): Promise<Workout> =>
    axios.get(`/api/workout?id=${id}`).then((res) => res.data);

  const fetchExercises = (id: string | undefined): Promise<Exercise[]> =>
    axios.get(`/api/exercises?id=${id}`).then((res) => res.data);

  const workoutQuery = useQuery(["workout", id], () =>
    fetchWorkout(id as string)
  );

  const exerciseQuery = useQuery(["exercises", id], () =>
    fetchExercises(id as string)
  );

  if (workoutQuery.isLoading && exerciseQuery.isLoading)
    return <Preloader label="Loading..." />;

  if (workoutQuery.error)
    return <Preloader label={`Error loading workout: ${workoutQuery.error}`} />;

  if (exerciseQuery.error)
    return (
      <Preloader label={`Error loading exercise: ${exerciseQuery.error}`} />
    );

  if (workoutQuery.isSuccess && exerciseQuery.isSuccess) {
    return (
      <Flex>
        <Heading1>{workoutQuery.data.workout_name}</Heading1>
        <Flex>
          <Timer workout={workoutQuery.data} exercises={exerciseQuery.data} />
        </Flex>
      </Flex>
    );
  }
};

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

const Heading1 = styled("h1", {});

export default Workout;
