import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TimerContext } from '../timerContext/timerProvider';

const TimerControl = () => {
  const { isTimer, setIsTimer, isTimerDone } = useContext(TimerContext);

  const router = useRouter();
  const handleBackToDashboard = () => {
    router.push(`/dashboard`);
  };

  const handleTimerToggle = () => {
    setIsTimer(!isTimer);
  };

  return (
    <div>
      {!isTimerDone ? (
        <button className="flex h-12 w-12 items-center justify-center rounded-full" onClick={handleTimerToggle}>
          {isTimer ? <PauseIcon className="h-9 w-9" /> : <PlayIcon className="h-9 w-9" />}
        </button>
      ) : (
        <button onClick={handleBackToDashboard}>Return to Dashboard</button>
      )}
    </div>
  );
};

export default TimerControl;
