import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Container } from "../../components/layout";
import Preloader from "../../components/preloader";
import Timer from "../../components/timer";
import TimerProvider from "../../components/timerContext";
import TimerControl from "../../components/timerControl/timerControl";
import TimerHeader from "../../components/timerHeader";
import { WorkoutWithExercises } from "../../hooks/useWorkouts";

import fetcher from "../../lib/fetcher";

const WorkoutTimer = () => {
  const router = useRouter();
  const workoutId = router.query.id as string;

  const { data, error } = useQuery({
    queryKey: ["workouts", workoutId],
    queryFn: () => (workoutId ? fetcher<WorkoutWithExercises>(workoutId, "v1/workout") : null),
    staleTime: Infinity,
  });

  if (!data) return <Preloader label="Loading workout..." />;
  if (error) return <Preloader label="Error loading page" />;

  return (
    <TimerProvider>
      <Container>
        <TimerHeader data={data} />
        <Timer data={data} />
        <TimerControl />
      </Container>
    </TimerProvider>
  );
};

export default WorkoutTimer;
