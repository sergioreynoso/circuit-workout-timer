import React from "react";
import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";
import Link from "next/link";
import useWorkoutQuery from "../../hooks/useWorkoutQuery";

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const workoutQuery = useWorkoutQuery(id as string);

  if (workoutQuery.isLoading) return <Preloader label="Loading..." />;

  if (workoutQuery.error || !workoutQuery.isSuccess)
    return <Preloader label={`Error loading workout: ${workoutQuery.error}`} />;

  return (
    <Box>
      <Heading1>{workoutQuery.data.workout_name}</Heading1>
      <Navigation>
        <Link href="/dashboard">
          <LinkTag>Cancel</LinkTag>
        </Link>
        <Link href={`/editWorkout/${id as string}`}>
          <LinkTag>Edit</LinkTag>
        </Link>
      </Navigation>

      <Box>
        <Timer
          workout={workoutQuery.data}
          exercises={workoutQuery.data.exercises}
        />
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
