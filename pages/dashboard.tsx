import React from "react";
import WorkoutList from "../components/workoutList";
import { Flex } from "../components/layout";
import WorkoutListHeader from "../components/workoutListHeader/workoutListHeader";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { Workout } from "@prisma/client";

const Dashboard = ({ id: userId, data }: { id: string; data: Workout[] }) => {
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
        <WorkoutList data={data} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const id = session.user?.id;
  const workouts = await prisma?.workout.findMany({
    where: {
      userId: id as string,
    },
    orderBy: {
      display_seq: "asc",
    },
  });

  return {
    props: {
      id,
      data: workouts,
    },
  };
};

export default Dashboard;
