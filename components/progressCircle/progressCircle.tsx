import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";
import {
  ExerciseWithTimestamp,
  FormattedWorkout,
} from "../../hooks/useWorkout";
import { styled } from "../../styles/stitches.congif";
import { CounterContext } from "../counterProvider/counterProvider";
import { Box, Flex } from "../layout";
import { TIMER_INTERVAL } from "../../hooks/useTimer";

type Props = {
  runningActivity: ExerciseWithTimestamp | FormattedWorkout;
  runningActivityTime: number;
  scale?: number;
  color?: string;
  children?: JSX.Element | JSX.Element[];
};

const ProgressCircle = ({
  runningActivity,
  runningActivityTime,
  scale = 1,
  color = "$primary-09",
  children,
}: Props) => {
  const controls = useAnimationControls();
  const { isTimer } = useContext(CounterContext);

  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = center - strokeWidth;

  const progress = 100;
  const dashArray = Math.ceil(2 * Math.PI * radius);
  const dashOffset = dashArray * ((100 - progress) / 100);

  useEffect(() => {
    const totalDuration = runningActivity.duration;
    controls.set({
      strokeDashoffset: dashArray,
    });
    controls.start({
      strokeDashoffset: dashOffset,
      transition: {
        duration: totalDuration / TIMER_INTERVAL,
        ease: [0, 0, 0, 0],
      },
    });
  }, [runningActivity]);

  useEffect(() => {
    isTimer
      ? controls.start({
          strokeDashoffset: dashOffset,
          transition: {
            duration: (runningActivityTime + TIMER_INTERVAL) / TIMER_INTERVAL,
            ease: [0, 0, 0, 0],
          },
        })
      : controls.stop();
  }, [isTimer]);

  return (
    <>
      <Flex
        css={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "$bp-sm",
          margin: "auto",
        }}>
        <Box
          as="svg"
          viewBox="0 0 100 100"
          css={{ width: "100%", transform: `rotate(-90deg) scale(${scale})` }}>
          <Box
            as="circle"
            width={size}
            height={size}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            css={{
              fill: "transparent",
              stroke: "$gray-04",
            }}
          />
          <Box
            as={motion.circle}
            width={size}
            height={size}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            fill="transparent"
            initial={{
              strokeDashoffset: dashArray,
            }}
            animate={controls}
            css={{
              stroke: color,
              strokeLinecap: "round",
            }}
          />
        </Box>
        <Flex
          direction="column"
          css={{
            position: "absolute",
            justifyContent: "center",
          }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default ProgressCircle;
