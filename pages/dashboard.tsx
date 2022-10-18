import { Workouts } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../components/button";
import prisma from "../lib/prisma";
import { styled } from "../styles/stitches.congif";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const workoutQuery = useQuery(["workouts"], () =>
    fetch(`api/workouts?id=${session?.user?.id}`).then((res) => res.json())
  );

  if (workoutQuery.isLoading) {
    return (
      <Flex
        css={{
          justifyContent: "center",
          padding: "24px",
        }}>
        <p>Loading...</p>
      </Flex>
    );
  }

  const workouts: Workouts[] = workoutQuery.data;

  return (
    <Flex
      as="main"
      css={{
        alignItems: "center",
        paddingTop: "24px",
      }}>
      <UList>
        {workouts.map((work) => {
          return (
            <List as="li" key={work.id}>
              <Link href={`/workout/${work.id}`}>
                <LinkTag>
                  <Label> {work.workout_name}</Label>
                </LinkTag>
              </Link>
            </List>
          );
        })}
      </UList>
    </Flex>
  );
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
