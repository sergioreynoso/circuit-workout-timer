import React from "react";
import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";

import Link from "next/link";
import useWorkoutQuery from "../../hooks/useWorkoutQuery";
import useAllExerciseQuery from "../../hooks/useAllExerciseQuery";

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const workoutQuery = useWorkoutQuery(id as string);
  const exerciseQuery = useAllExerciseQuery(id as string);

  if (workoutQuery.isLoading && exerciseQuery.isLoading)
    return <Preloader label="Loading..." />;

  if (workoutQuery.error || !workoutQuery.isSuccess)
    return <Preloader label={`Error loading workout: ${workoutQuery.error}`} />;

  if (exerciseQuery.error || !exerciseQuery.isSuccess)
    return (
      <Preloader label={`Error loading exercise: ${exerciseQuery.error}`} />
    );

  return (
    <Box>
      <Heading1>{workoutQuery.data.workout_name}</Heading1>
      <Navigation>
        <Link href="/dashboard">
          <LinkTag>Back</LinkTag>
        </Link>
        <Link href={`/editWorkout/${id as string}`}>
          <LinkTag>Edit</LinkTag>
        </Link>
      </Navigation>

      <Box>
        <Timer workout={workoutQuery.data} exercises={exerciseQuery.data} />
      </Box>
    </Box>
  );
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

export default Workout;
