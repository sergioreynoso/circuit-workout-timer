import React, { useContext, useEffect, useState } from "react";

import { styled } from "../../styles/stitches.congif";
import { Box, Flex } from "../layout";
import { CounterContext } from "../counterProvider/counterProvider";
import { motion, useAnimationControls } from "framer-motion";
import { Activity } from "../../hooks/useWorkout";

type Props = {
  runningActivity: Activity;
  runningActivityTime: number;
};

const ProgressBar = ({ runningActivity, runningActivityTime }: Props) => {
  const controls = useAnimationControls();
  const { isTimer } = useContext(CounterContext);

  useEffect(() => {
    controls.set({
      width: "0%",
    });
    controls.start({
      width: "100%",
      transition: {
        duration: runningActivity.duration / 1000,
        ease: [0, 0, 0, 0],
      },
    });
  }, [runningActivity]);

  useEffect(() => {
    if (isTimer) {
      console.log("boom");
      controls.start({
        width: "100%",
        transition: {
          duration: runningActivityTime / 1000,
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
