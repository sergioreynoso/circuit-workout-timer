import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as Label from '@radix-ui/react-label';

import React, { useId, useState } from 'react';
import CircleButton from '../circleButton/circleButton';

interface Props {
  label: string;
  min: number;
  max: number;
  initialValue: number;
  handleChange: (value: number) => void;
}

const StepperInput = ({ label, min, max, initialValue, handleChange }: Props) => {
  const id = useId();
  const [value, setValue] = useState(() => initialValue.toString());

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.valueAsNumber.toString();
    if (inputValue === 'NaN') inputValue = '0';

    setValue(inputValue);
    handleChange(Number(inputValue));
  }

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const inputName = e.currentTarget.name;
    let newValue = Number(value);

    if (inputName === 'increment') newValue = newValue < max ? newValue + 1 : max;
    if (inputName === 'decrement') newValue = newValue > min ? newValue - 1 : min;

    setValue(newValue.toString());
    handleChange(newValue);
  }

  return (
    <div className="flex flex-col gap-3">
      <Label.Root htmlFor={id} className="text-base font-semibold leading-6 text-gray-300">
        {label}
      </Label.Root>
      <div className="flex items-center gap-2">
        <CircleButton
          name="decrement"
          intent="decrement"
          description="Decrease number of sets"
          onClick={onClickHandler}
        />
        <input
          type="number"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={onChangeHandler}
          inputMode="decimal"
          className="w-13 h-12 rounded-lg border border-gray-500 bg-transparent px-4"
        />
        <CircleButton
          name="increment"
          intent="increment"
          description="Increase number of sets"
          onClick={onClickHandler}
        />
      </div>
    </div>
  );
};

export default StepperInput;
