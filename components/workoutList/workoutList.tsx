import Link from "next/link";
import React from "react";
import useAllWorkoutsQuery from "../../hooks/useAllWorkoutsQuery";
import { styled } from "../../styles/stitches.congif";
import Preloader from "../preloader";

const WorkoutList = ({ userId }: { userId: string }) => {
  const { data, isLoading, error, isSuccess } = useAllWorkoutsQuery(userId);

  if (isLoading) return <Preloader label="loading..." />;
  if (error || !isSuccess) return <Preloader label={`Error:${error}`} />;

  return (
    <ListWrapper>
      {data.map((workout) => {
        return (
          <List as="li" key={workout.id}>
            <Link href={`/workout/${workout.id}`}>
              <LinkTag>
                <Label> {workout.workout_name}</Label>
              </LinkTag>
            </Link>
          </List>
        );
      })}
    </ListWrapper>
  );
};

const ListWrapper = styled("ul", {
  flex: 1,
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  listStyle: "none",
});

const List = styled("li", {
  height: "50px",
  backgroundColor: "$primary-03",
});

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
