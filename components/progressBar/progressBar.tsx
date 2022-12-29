import { useContext, useEffect } from "react";

import { motion, useAnimationControls } from "framer-motion";
import { Activity } from "../../hooks/useWorkout";
import { styled } from "../../styles/stitches.congif";
import { Flex } from "../layout";
import { TimerContext } from "../timerContext/timerProvider";

type Props = {
  runningActivity: Activity;
  runningActivityTime: number;
};

const ProgressBar = ({ runningActivity, runningActivityTime }: Props) => {
  const controls = useAnimationControls();
  const { isTimer } = useContext(TimerContext);

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
  }, [runningActivity, controls]);

  useEffect(() => {
    if (isTimer) {
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
  }, [isTimer, controls, runningActivityTime]);

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
