import React, { useContext, useEffect, useState } from "react";

import { styled } from "../../styles/stitches.congif";
import { Box, Flex } from "../layout";
import { CounterContext } from "../counterProvider/counterProvider";
import { motion, useAnimationControls } from "framer-motion";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";

type Props = {
  runningExercise: ExerciseWithTimestamp;
  runningExerciseTime: number;
};

const ProgressBar = ({ runningExercise, runningExerciseTime }: Props) => {
  const controls = useAnimationControls();
  const { isTimer } = useContext(CounterContext);

  useEffect(() => {
    console.log("workout change", runningExercise.exercise_name);
    controls.set({
      width: "0%",
    });
    controls.start({
      width: "100%",
      transition: {
        duration: runningExercise.duration / 1000,
        ease: [0, 0, 0, 0],
      },
    });
  }, [runningExercise]);

  useEffect(() => {
    if (isTimer) {
      console.log("boom");
      controls.start({
        width: "100%",
        transition: {
          duration: runningExerciseTime / 1000,
          ease: [0, 0, 0, 0],
        },
      });
    } else {
      controls.stop();
    }
  }, [isTimer]);

  return (
    <Flex
      css={{
        maxWidth: "$bp-sm",
        margin: "20px auto",
        backgroundColor: "$gray-05",
      }}>
      <Bar layout animate={controls} />
    </Flex>
  );
};

const Bar = styled(motion.div, {
  height: 5,
  background: "$primary-09",
});

export default ProgressBar;
