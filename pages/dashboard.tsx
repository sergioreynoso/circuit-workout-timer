import React from "react";
import { useSession } from "next-auth/react";
import { styled } from "../styles/stitches.congif";
import WorkoutList from "../components/workoutList";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please login</p>;

  const userId: string | undefined = session?.user?.id;

  return (
    <Box
      as="main"
      css={{
        alignItems: "center",
        paddingTop: "24px",
      }}>
      {userId ? <WorkoutList userId={userId} /> : null}
    </Box>
  );
};

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
});

export default Dashboard;
