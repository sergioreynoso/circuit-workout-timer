import React from "react";
import { useSession } from "next-auth/react";
import { styled } from "../styles/stitches.congif";
import WorkoutList from "../components/workoutList";
import { Flex } from "../components/layout";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please login</p>;

  const userId: string | undefined = session?.user?.id;

  return (
    <Flex
      as="main"
      css={{
        justifyContent: "center",

        alignItems: "center",
        paddingTop: "24px",
      }}>
      {userId ? <WorkoutList userId={userId} /> : null}
    </Flex>
  );
};
export default Dashboard;
