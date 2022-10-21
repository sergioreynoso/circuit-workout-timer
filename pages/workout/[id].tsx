import React from "react";
import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";
import useLoadWorkout from "../../hooks/useLoadWorkout";
import Link from "next/link";

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [workoutQuery, exerciseQuery] = useLoadWorkout(id as string);

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
        <Link href={`/edit_workout/${id as string}`}>
          <Edit>Edit</Edit>
        </Link>
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

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

const Edit = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Workout;
