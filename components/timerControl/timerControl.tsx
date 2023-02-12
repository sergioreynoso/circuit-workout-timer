import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Button from '../button';
import { TimerContext } from '../timerContext/timerProvider';
import { FooterContainer } from '../layout';

const TimerControl = () => {
  const { isTimer, setIsTimer, isTimerDone } = useContext(TimerContext);
  const [label, setLabel] = useState<string>('start');

  const router = useRouter();
  const handleBackToDashboard = () => {
    router.push(`/dashboard`);
  };

  const handleTimerToggle = () => {
    isTimer ? setLabel('continue') : setLabel('pause');
    setIsTimer(!isTimer);
  };

  return (
    <FooterContainer>
      {!isTimerDone ? (
        <Button colors="primary" onClick={handleTimerToggle}>
          {label}
        </Button>
      ) : (
        <Button onClick={handleBackToDashboard}>Return to Dashboard</Button>
      )}
    </FooterContainer>
  );
};

export default TimerControl;
