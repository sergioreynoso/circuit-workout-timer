import React from "react";
import useAllExerciseQuery from "../../hooks/useAllExerciseQuery";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import AddExerciseDialog from "../addExerciseDialog";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExcersiseDialog";
import { Flex } from "../layout";
import Preloader from "../preloader";

const ExerciseList = ({ workoutId }: { workoutId: string }) => {
  const { data, isLoading, error, isSuccess } = useAllExerciseQuery(
    workoutId as string
  );

  if (isLoading) return <Preloader label="Loading..." />;

  if (error || !isSuccess)
    return <Preloader label={`Error loading workout: ${error}`} />;

  return (
    <Flex layout="column">
      <Flex
        css={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "$lg",
        }}>
        <h3>Add exercise</h3>
        <AddExerciseDialog
          workoutId={workoutId}
          exercisesTotalCount={data.length}
        />
      </Flex>
      <Flex as="ul" layout="column" css={{ gap: "$sm", minWidth: "$bp-sm" }}>
        {data.map((item) => (
          <Item key={item.id}>
            <ItemTitle>{item.exercise_name}</ItemTitle>
            <Flex
              css={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: "$2x",
              }}>
              <ListItemDuration>{formatTime(item.duration)}</ListItemDuration>
              <EditExerciseDialog exerciseData={item} />
              <DeleteExerciseDialog exerciseId={item.id} />
            </Flex>
          </Item>
        ))}
      </Flex>
    </Flex>
  );
};

const Item = styled("li", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: "$2x",
  padding: "$lg",
  color: "$primary-12",
  backgroundColor: "$primary-03",
});

const ItemTitle = styled("p", {
  fontWeight: "$700",
});

const ListItemDuration = styled("span", {});

export default ExerciseList;
