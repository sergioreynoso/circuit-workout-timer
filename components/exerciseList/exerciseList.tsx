import React from "react";
import useAllExerciseQuery from "../../hooks/useAllExerciseQuery";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import AddExerciseDialog from "../addExerciseDialog";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExcersiseDialog";
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
        <h3>Add exercise</h3>
        <AddExerciseDialog
          workoutId={workoutId}
          exercisesTotalCount={data.length}
        />
      </Header>
      <ListWrapper>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemTitle>{item.exercise_name}</ListItemTitle>
            <ListItemDuration>{formatTime(item.duration)}</ListItemDuration>
            <EditExerciseDialog exerciseData={item} />
            <DeleteExerciseDialog exerciseId={item.id} />
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
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$sm",
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
});

const ListItemTitle = styled("p", {
  fontWeight: "$700",
});

const ListItemDuration = styled("span", {});

export default ExerciseList;
