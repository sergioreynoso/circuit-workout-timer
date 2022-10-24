import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import EditWorkoutForm from "../../components/editWorkoutForm";
import Preloader from "../../components/preloader";
import useWorkoutQuery from "../../hooks/useWorkoutQuery";
import { styled } from "../../styles/stitches.congif";

const Edit = () => {
  const router = useRouter();
  const { id: workoutId } = router.query;

  const workoutQuery = useWorkoutQuery(workoutId as string);

  if (workoutQuery.isLoading) return <Preloader label="Loading..." />;

  if (workoutQuery.error || !workoutQuery.isSuccess)
    return <Preloader label={`Error loading workout: ${workoutQuery.error}`} />;

  return (
    <Box>
      <Heading1>{`Edit ${workoutQuery.data.workout_name}`}</Heading1>
      <Link href={`/workout/${workoutId as string}`}>
        <Back>Back</Back>
      </Link>
      <EditWorkoutForm workoutData={workoutQuery.data} />
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

const Back = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Edit;
