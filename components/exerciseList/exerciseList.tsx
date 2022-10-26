import Link from "next/link";
import React from "react";
import useAllExerciseQuery from "../../hooks/useAllExerciseQuery";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Dialog from "../dialog";
import EditExercise from "../editExcersise";
import Preloader from "../preloader";

const ExerciseList = ({ workoutId }: { workoutId: string }) => {
  const { data, isLoading, error, isSuccess } = useAllExerciseQuery(
    workoutId as string
  );

  if (isLoading) return <Preloader label="Loading..." />;

  if (error || !isSuccess)
    return <Preloader label={`Error loading workout: ${error}`} />;

  return (
    <Wrapper>
      <Header>
        <h3>Build wourk out</h3>
        <p>Add exercises or rests between exercises. </p>
      </Header>
      <ListWrapper>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemTitle>{item.exercise_name}</ListItemTitle>
            <ListItemDuration>{formatTime(item.duration)}</ListItemDuration>
            <EditExercise exerciseData={item} />
          </ListItem>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "$sm",
  maxWidth: "$bp-sm",
  padding: "$lg",
});

const ListWrapper = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$sm",
  maxWidth: "$bp-sm",
  minWidth: "300px",
  listStyle: "none",
});

const ListItem = styled("li", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "$3x",
  padding: "$lg",
  color: "$primary-12",
  backgroundColor: "$primary-03",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "$primary-04",
  },
  "&:active": {
    backgroundColor: "$primary-05",
  },
});

const ListItemTitle = styled("p", {
  fontWeight: "$700",
});

const ListItemDuration = styled("span", {});

export default ExerciseList;
