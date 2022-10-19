import { Exercises, Workouts } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";
import axios from "axios";

export type Exercise = Omit<Exercises, "workoutsId">;

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchWorkout = (id: string | undefined): Promise<Workouts> =>
    axios.get(`/api/workout?id=${id}`).then((res) => res.data);

  const fetchExercises = (id: string | undefined): Promise<Exercise[]> =>
    axios.get(`/api/exercises?id=${id}`).then((res) => res.data);

  const workoutQuery = useQuery(["workout", id], () =>
    fetchWorkout(id as string)
  );

  const exerciseQuery = useQuery(["exercises", id], () =>
    fetchExercises(id as string)
  );

  if (workoutQuery.isLoading && exerciseQuery.isLoading) {
    return (
      <Flex>
        <Preloader label="Loading..." />
      </Flex>
    );
  }

  if (workoutQuery.error) return `Error loading workout: ${workoutQuery.error}`;
  if (exerciseQuery.error)
    return `Error loading exercises: ${exerciseQuery.error}`;

  if (workoutQuery.isSuccess && exerciseQuery.isSuccess) {
    return (
      <Flex>
        <p>{workoutQuery.data.workout_name}</p>
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

const UList = styled("ul", {
  flex: 1,
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  listStyle: "none",
  paddingTop: "$lg",
});

const List = styled("li", {
  display: "flex",
  alignItems: "center",
  height: "50px",
  padding: "16px",
  backgroundColor: "$primary-02",
});

const Label = styled("div", {
  display: "flex",

  alignItems: "center",
  height: "100%",
  paddingInline: "24px",
});

const LinkTag = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

export default Workout;
