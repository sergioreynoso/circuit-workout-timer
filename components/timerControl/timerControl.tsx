import React, { useContext, useState } from "react";
import Button from "../button";
import { CounterContext } from "../counterProvider/counterProvider";
import { Box, Flex } from "../layout";

const TimerControl = () => {
  const { isTimer, setIsTimer } = useContext(CounterContext);
  const [label, setLabel] = useState<string>("start");

  const onStart = () => {
    isTimer ? setLabel("continue") : setLabel("pause");
    setIsTimer(!isTimer);
  };

  return (
    <Flex
      css={{
        justifyContent: "center",
        maxWidth: "$bp-md",
        margin: "auto",
        backgroundColor: "$gray-03",
        padding: "$2x",
      }}>
      <Button colors="primary" onClick={onStart}>
        {label}
      </Button>
    </Flex>
  );
};

export default TimerControl;
