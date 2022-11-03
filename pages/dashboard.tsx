import React from "react";
import { useSession } from "next-auth/react";
import { styled } from "../styles/stitches.congif";
import WorkoutList from "../components/workoutList";
import { Flex } from "../components/layout";
import Button from "../components/button";
import WorkoutListHeader from "../components/workoutListHeader/workoutListHeader";
import { GetServerSideProps } from "next";
import { Workout } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please Login</p>;
  if (!session) return <p>Error Authenticating Session</p>;
  if (!session.user) return <p>Error Authenticating User</p>;

  const userId = session.user.id;

  return (
    <Flex css={{ justifyContent: "center" }}>
      <Flex
        direction="column"
        css={{
          flex: 1,
          gap: "$2x",
          padding: "$2x $lg",
          maxWidth: "600px",
        }}>
        <WorkoutListHeader userId={userId} />
        <WorkoutList userId={userId} />
      </Flex>
    </Flex>
  );
};
export default Dashboard;
