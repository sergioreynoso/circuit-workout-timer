import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Button from "../button";
import { CounterContext } from "../counterProvider/counterProvider";
import { Box, Flex } from "../layout";

const TimerControl = () => {
  const { isTimer, setIsTimer, isTimerDone } = useContext(CounterContext);
  const [label, setLabel] = useState<string>("start");

  const router = useRouter();
  const handleBackToDashboard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    router.push(`/dashboard`);
  };

  const handleTimerToggle = () => {
    isTimer ? setLabel("continue") : setLabel("pause");
    setIsTimer(!isTimer);
  };

  return (
    <Flex
      css={{
        justifyContent: "center",
        padding: "$2x",
      }}>
      {!isTimerDone ? (
        <Button colors="primary" onClick={handleTimerToggle}>
          {label}
        </Button>
      ) : (
        <Button onClick={handleBackToDashboard}>Return to Dashboard</Button>
      )}
    </Flex>
  );
};

export default TimerControl;
