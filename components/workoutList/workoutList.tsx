import Link from "next/link";
import React from "react";
import useAllWorkoutsQuery from "../../hooks/useAllWorkoutsQuery";
import { styled } from "../../styles/stitches.congif";
import DeleteWorkoutDialog from "../deleteWorkoutDialog";
import { Flex } from "../layout";
import Preloader from "../preloader";

const WorkoutList = ({ userId }: { userId: string }) => {
  const { data, isLoading, error, isSuccess } = useAllWorkoutsQuery(userId);

  if (isLoading) return <Preloader label="loading..." />;
  if (error || !isSuccess) return <Preloader label={`Error:${error}`} />;

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
              height: "50px",
              backgroundColor: "$primary-03",
            }}>
            <Link href={`/workout/${workout.id}`}>
              <LinkTag>
                <Label> {workout.workout_name}</Label>
              </LinkTag>
            </Link>
            <DeleteWorkoutDialog workoutId={workout.id} />
          </Flex>
        );
      })}
    </Flex>
  );
};

const Label = styled("div", {
  display: "flex",

  alignItems: "center",
  height: "100%",
  paddingLeft: "24px",
});

const LinkTag = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
});

export default WorkoutList;
