import { Workout } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { styled } from "../../styles/stitches.congif";
import DeleteWorkoutDialog from "../deleteWorkoutDialog";
import { Flex } from "../layout";

const WorkoutList = ({ data }: { data: Workout[] }) => {
  return (
    <Flex
      direction="column"
      css={{
        gap: "$sm",
        listStyle: "none",
      }}>
      {data.map((workout) => {
        return (
          <Flex
            as="li"
            key={workout.id}
            css={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",
              paddingInline: "$lg",
              backgroundColor: "$primary-03",
            }}>
            <NextLink href={`/workout/${workout.id}`}>
              {workout.workout_name}
            </NextLink>
            <DeleteWorkoutDialog workoutId={workout.id} />
          </Flex>
        );
      })}
    </Flex>
  );
};

const NextLink = styled(Link, {
  flex: 1,
  display: "flex",
  alignItems: "center",
  height: "100%",
  color: "$primary-12",
  textDecoration: "none",
  cursor: "pointer",
});

export default WorkoutList;
