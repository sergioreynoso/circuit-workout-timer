import { Exercise } from "@prisma/client";
import React from "react";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import AddExerciseDialog from "../addExerciseDialog";
import DeleteExerciseDialog from "../deleteExerciseDialog";
import EditExerciseDialog from "../editExcersiseDialog";
import { Flex } from "../layout";

type Props = {
  workoutId: string;
  data: Exercise[];
};

const ExerciseList = ({ workoutId, data }: Props) => {
  return (
    <Flex direction="column">
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
      <Flex as="ul" direction="column" css={{ gap: "$sm", minWidth: "$bp-sm" }}>
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
