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
        <button onClick={handleTimerToggle}>{label}</button>
      ) : (
        <button onClick={handleBackToDashboard}>Return to Dashboard</button>
      )}
    </FooterContainer>
  );
};

export default TimerControl;
