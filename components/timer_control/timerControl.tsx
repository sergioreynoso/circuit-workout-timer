import React, { useState } from "react";
import Button from "../button";

interface TimerControlProps {
  startTimer: () => void;
  isTimer: boolean;
}

const TimerControl = ({ startTimer, isTimer }: TimerControlProps) => {
  const [label, setLabel] = useState<string>("start");

  const onClickHandler = () => {
    startTimer();
    if (isTimer) {
      setLabel("continue");
    } else {
      setLabel("pause");
    }
  };

  return <Button onClick={onClickHandler}>{label}</Button>;
};

export default TimerControl;
