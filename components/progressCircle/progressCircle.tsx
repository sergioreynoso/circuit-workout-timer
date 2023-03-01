import { motion, useAnimationControls } from 'framer-motion';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { TIMER_INTERVAL } from '../../hooks/useTimer';
import { FormattedActivity, FormattedWorkout } from '../../hooks/useFormatWorkout';
import { TimerContext } from '../timerContext/timerProvider';

type Props = {
  runningActivity: FormattedActivity | FormattedWorkout;
  runningActivityTime: number;
  progress?: number;
  size?: number;
  strokeWidth?: number;
  scale?: number;
  intent?: 'workout' | 'activity';
  children?: JSX.Element | JSX.Element[];
};

const strokeColors = {
  workout: 'stroke-amber-400',
  activity: 'stroke-green-400',
} as const;

const ProgressCircle = ({
  runningActivity,
  runningActivityTime,
  progress = 100,
  size = 100,
  strokeWidth = 2,
  scale = 1,
  intent = 'workout',
  children,
}: Props) => {
  const controls = useAnimationControls();
  const { isTimer } = useContext(TimerContext);

  const scaleValue = () => {
    return `scale-[${scale}]`;
  };

  const [center, radius, dashArray, dashOffset] = useMemo(() => {
    const center = size / 2;
    const radius = center - strokeWidth;
    const dashArray = Math.ceil(2 * Math.PI * radius);
    const dashOffset = dashArray * ((100 - progress) / 100);

    return [center, radius, dashArray, dashOffset];
  }, [progress, size, strokeWidth]);

  const updateRunningActivityProgress = useCallback(
    (activity: FormattedActivity | FormattedWorkout) => {
      const totalDuration = activity.duration;
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
    },
    [controls, dashArray, dashOffset]
  );

  const toggleProgress = useCallback(() => {
    isTimer
      ? controls.start({
          strokeDashoffset: dashOffset,
          transition: {
            duration: (runningActivityTime + TIMER_INTERVAL) / TIMER_INTERVAL,
            ease: [0, 0, 0, 0],
          },
        })
      : controls.stop();
  }, [controls, dashOffset, isTimer, runningActivityTime]);

  useEffect(() => {
    updateRunningActivityProgress(runningActivity);
  }, [runningActivity, updateRunningActivityProgress]);

  useEffect(() => {
    toggleProgress();
  }, [toggleProgress]);

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 100 100" className={`-rotate-90`} width="100%" height="100%">
        <circle
          width={size}
          height={size}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-transparent stroke-gray-800/30"
        />
        <motion.circle
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
          // css={{
          //   stroke: color,
          //   strokeLinecap: 'round',
          // }}
          className={`${strokeColors[intent]}`}
        />
      </svg>
      {children && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex scale-[.98] flex-col justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
