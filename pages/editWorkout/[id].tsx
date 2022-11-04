import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import EditWorkoutForm from "../../components/editWorkoutForm";
import ExerciseList from "../../components/exerciseList";
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
    <Wrapper>
      <Header>
        <Heading1>Edit Workout</Heading1>
        <Link href={`/workout/${workoutId as string}`}>
          <Back>Cancel</Back>
        </Link>
      </Header>
      <EditWorkoutForm workoutData={workoutQuery.data}>
        <ExerciseList
          workoutId={workoutId as string}
          data={workoutQuery.data.exercises}
        />
      </EditWorkoutForm>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$lg",
  padding: "$2x",
});

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

const Back = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Edit;
