import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React, { useId, useState } from 'react';
import Button from '../button';
import { Flex } from '../layout';

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
    <Flex direction="column" css={{ gap: '$sm', paddingBlock: '$xl', maxWidth: '200px', flex: '1' }}>
      <label htmlFor={id}>{label}</label>
      <Flex css={{ gap: '$lg' }}>
        <button type="button" name="decrement" onClick={onClickHandler}>
          <MinusIcon />
          <VisuallyHidden.Root>Decrease number of sets</VisuallyHidden.Root>
        </button>
        <input type="number" id={id} value={value} min={min} max={max} onChange={onChangeHandler} inputMode="decimal" />
        <button type="button" name="increment" onClick={onClickHandler}>
          <PlusIcon />
          <VisuallyHidden.Root>Increase number of sets</VisuallyHidden.Root>
        </button>
      </Flex>
    </Flex>
  );
};

export default StepperInput;
