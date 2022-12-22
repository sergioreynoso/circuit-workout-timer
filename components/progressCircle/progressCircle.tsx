import { animate, motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import useInterval from "../../hooks/useInterval";
import { ExerciseWithTimestamp } from "../../hooks/useWorkout";
import { styled } from "../../styles/stitches.congif";
import { CounterContext } from "../counterProvider/counterProvider";
import { Box, Flex } from "../layout";

type Props = {
  runningExercise: ExerciseWithTimestamp;
  runningExerciseTime: number;
  children: JSX.Element | JSX.Element[];
};

const ProgressCircle = ({
  runningExercise,
  runningExerciseTime,
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
    controls.set({
      strokeDashoffset: dashArray,
    });
    controls.start({
      strokeDashoffset: dashOffset,
      transition: {
        duration: runningExercise.duration / 1000,
        ease: [0, 0, 0, 0],
      },
    });
  }, [runningExercise]);

  useEffect(() => {
    if (isTimer) {
      controls.start({
        strokeDashoffset: dashOffset,
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
    <>
      <Flex
        css={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "$bp-sm",
          margin: "auto",
          //   border: "1px solid black",
        }}>
        <Svg viewBox="0 0 100 100">
          <Track
            width={size}
            height={size}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Indicator
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
          />
        </Svg>
        <Flex
          direction="column"
          css={{
            position: "absolute",
          }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
};

const Svg = styled("svg", {
  width: "100%",
  transform: "rotate(-90deg)",
  //   backgroundColor: "$primary-03",
});

const Track = styled("circle", {
  fill: "transparent",
  stroke: "$gray-04",
});

const Indicator = styled(motion.circle, {
  stroke: "$primary-09",
  strokeLinecap: "round",
});

export default ProgressCircle;
