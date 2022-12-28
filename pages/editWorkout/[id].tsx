import { GetServerSideProps } from "next";
import EditWorkoutForm from "../../components/editWorkoutForm";
import ActivityList from "../../components/activityList";
import useFetchWorkout, {
  WorkoutWithExercises,
} from "../../hooks/useFetchWorkout";
import { prisma } from "../../lib/prisma";
import { styled } from "../../styles/stitches.congif";
import cuid from "cuid";

type Props = {
  initialData: WorkoutWithExercises;
};

const Edit = ({ initialData }: Props) => {
  const { data } = useFetchWorkout(
    "getWorkout",
    initialData.id,
    "workout",
    initialData
  );

  console.log("Edit");

  if ("id" in data && "exercises" in data) {
    return (
      <Wrapper>
        <Header>
          <Heading1>Edit Workout</Heading1>
        </Header>
        <EditWorkoutForm initialData={data}>
          <ActivityList
            key={cuid()}
            workoutId={data.id}
            activitiesData={[...data.exercises]}
          />
        </EditWorkoutForm>
      </Wrapper>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const workout = await prisma?.workout.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      exercises: {
        orderBy: {
          display_seq: "asc",
        },
      },
    },
  });

  return {
    props: { initialData: workout },
  };
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$lg",
  padding: "$2x",
});

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

export default Edit;
