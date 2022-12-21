import React, { useContext } from "react";

import { styled } from "../../styles/stitches.congif";
import { Box, Flex } from "../layout";
import { CounterContext } from "../counterProvider/counterProvider";
import { motion, useAnimationControls } from "framer-motion";

type Props = {
  runningExerciseTime: number;
};

const ProgressBar = ({ runningExerciseTime }: Props) => {
  const runningExerciseControls = useAnimationControls();
  const { isTimer } = useContext(CounterContext);

  if (runningExerciseTime === 0) {
    runningExerciseControls.set({
      width: "0%",
    });
  } else {
    if (isTimer) {
      runningExerciseControls.start({
        width: "100%",
        transition: {
          duration: runningExerciseTime / 1000,
          ease: [0, 0, 0, 0],
        },
      });
    } else {
      runningExerciseControls.stop();
    }
  }

  return (
    <Flex
      css={{
        maxWidth: "$bp-sm",
        margin: "20px auto",
        backgroundColor: "$gray-05",
      }}>
      <Bar animate={runningExerciseControls} />
    </Flex>
  );
};

const Bar = styled(motion.div, {
  height: 5,
  background: "$primary-09",
});

export default ProgressBar;
