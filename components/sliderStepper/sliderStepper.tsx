import React from 'react';
import { CircleButton } from '../circleButton';
import { FormReducer } from '../editWorkoutForm/editWorkoutForm';
import Slider from '../slider/slider';

type Props = {
  value: number;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
};

const SliderStepper = ({
  value,
  minValue = 5000,
  maxValue = 30000,
  defaultValue = minValue,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <div className="flex grow-[5] items-center gap-2">
      <CircleButton
        intent="decrement"
        disabled={disabled}
        onClick={e => {
          e.preventDefault();
          value > minValue && onChange(value - 1000);
        }}
      />
      <Slider
        defaultValue={defaultValue}
        min={minValue}
        max={maxValue}
        step={5000}
        value={[value]}
        disabled={disabled}
        onValueChange={(value: number[]) => onChange(value[0])}
      />
      <CircleButton
        intent="increment"
        disabled={disabled}
        onClick={e => {
          e.preventDefault();
          value < maxValue && onChange(value + 1000);
        }}
      />
    </div>
  );
};

export default SliderStepper;
