import React from "react";
import { Workout } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

import { styled } from "../styles/stitches.congif";
import Preloader from "../components/preloader";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  const userId: string | undefined = session?.user?.id;

  const fetchWorkout = (id: string | undefined): Promise<Workout[]> =>
    axios.get(`api/workouts?id=${id}`).then((res) => res.data);

  const workoutQuery = useQuery(["workouts", userId], () =>
    fetchWorkout(userId)
  );

  if (workoutQuery.isLoading) return <Preloader label="loading..." />;
  if (workoutQuery.error)
    return <Preloader label={`Error:${workoutQuery.error}`} />;

  if (workoutQuery.isSuccess) {
    return (
      <Flex
        as="main"
        css={{
          alignItems: "center",
          paddingTop: "24px",
        }}>
        <UList>
          {workoutQuery.data.map((workout) => {
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
        </UList>
      </Flex>
    );
  }
};

const Flex = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const UList = styled("ul", {
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

export default Dashboard;
