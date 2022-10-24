import React from "react";
import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";

import Link from "next/link";
import useWorkoutQuery from "../../hooks/useWorkoutQuery";
import useExerciseQuery from "../../hooks/useExerciseQuery";

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const workoutQuery = useWorkoutQuery(id as string);
  const exerciseQuery = useExerciseQuery(id as string);

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
      <Link href={`/editWorkout/${id as string}`}>
        <Edit>Edit</Edit>
      </Link>
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

const Edit = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Workout;
