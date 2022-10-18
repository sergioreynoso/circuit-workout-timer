import Link from "next/link";
import { Exercises, Workouts } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../styles/stitches.congif";

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useQuery(
    ["workout"],
    () => fetch(`/api/workout?id=${id}`).then((res) => res.json()),
    { cacheTime: 0 }
  );
  const workout: Workouts = data;
  const workoutId = workout?.id;

  const exerciseQuery = useQuery(
    ["exercise"],
    () => fetch(`/api/exercises?id=${workoutId}`).then((res) => res.json()),
    { cacheTime: 0, enabled: !!workoutId }
  );

  if (isLoading) {
    return (
      <Flex
        css={{
          justifyContent: "center",
          padding: "24px",
        }}>
        <p>Loading...</p>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        css={{
          justifyContent: "center",
          padding: "24px",
        }}>
        <p>Error Loading data</p>
      </Flex>
    );
  }

  console.log(exerciseQuery.data);

  return (
    <Flex
      css={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>
      <p>{workout.workout_name}</p>
      <Flex>
        <UList>
          {exerciseQuery.data?.map((exercise: Exercises) => {
            return (
              <List as="li" key={exercise.id}>
                {exercise.exercise_name}
              </List>
            );
          })}
        </UList>
      </Flex>
    </Flex>
  );
};

const Flex = styled("div", {
  display: "flex",
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
